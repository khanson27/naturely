import { getUsers } from "./Auth-user.js";
import { life, seaLife, commentsData } from "./LifeData.js";
import { createClient } from "pexels";
import * as fs from "fs";
import axios from "axios";
const client = createClient(
  "563492ad6f917000010000015cda9074900545ac9d5cdf2d4d9bd824"
);

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const seed = (data, count) => {
  if (count === data.length - 1) return "done";
  console.log(data[count]);
  const Photos = client.photos.search({
    query: `${data[count].toLowerCase()}`,
    per_page: 20,
  });
  Promise.all([Photos, data, count]).then(([photos, data, count]) => {
    fs.readFile("./Data/Topics.json", "utf8", (err, topics) => {
      if (err) console.log(err);
      else {
        const topicObj = JSON.parse(topics);
        fs.writeFile(
          "./Data/Topics.json",
          JSON.stringify([
            ...topicObj,
            {
              title: data[count],
              description: photos.photos[3].alt,
              image: photos.photos[3].src.medium,
              usageCount: 0,
            },
          ]),
          (err, data) => {
            if (err) console.log(err);
          }
        );
      }
    });

    photos.photos.forEach((photo) => {
      const posts = JSON.parse(fs.readFileSync("./Data/Posts.json", "utf8"));
      fs.writeFileSync(
        "./Data/Posts.json",
        JSON.stringify([
          ...posts,
          {
            description: photo.alt,
            image: photo.src.medium,
            topics: [data[count]],
            commentCount: 0,
            likes: [],
            author: "test",
            createdDate: Date.now(),
          },
        ])
      );
    });
    const land = seaLife.includes(data[count]) ? "yes" : "no";
    console.log(land);
    seed(life, count + 1);
  });
};

//seed(life, 0);

let land = "b";

const seedLoc = async (posts, count) => {
  if (count === posts.length - 1) return "done";
  if (posts.length - count < 57) {
    await sleep(200);
    land = seaLife.includes(posts[count].topics[0]) ? "no" : "yes";
    console.log(land);
    const position = await axios.get(
      `https://api.3geonames.org/?randomland=${land}&json=1`
    );
    posts[count] = {
      ...posts[count],
      latitude1: position.data.nearest.latt,
      latitude2: position.data.nearest.latt,
      longitude1: position.data.nearest.longt,
      longitude2: position.data.nearest.longt,
    };
    fs.writeFileSync("./Data/Posts.json", JSON.stringify(posts));
  }
  seedLoc(posts, count + 1);
};

const seedLocation = () => {
  const posts = JSON.parse(fs.readFileSync("./Data/Posts.json", "utf8"));
  seedLoc(posts, 0);
};

//seedLocation();

const seedLike = async (posts, count, users) => {
  if (count === posts.length) return "done";
  //if (posts.length - count < 57) {
  await sleep(40);
  Math.floor(Math.random() * users.length);
  const likedUsers = [];
  while (likedUsers.length < Math.floor(Math.random() * 2)) {
    const num = Math.floor(Math.random() * users.length);
    if (likedUsers.indexOf(users[num]) === -1) likedUsers.push(users[num]);
  }
  posts[count].likes.push(...likedUsers);
  fs.writeFileSync("./Data/Posts.json", JSON.stringify(posts));
  // }
  seedLike(posts, count + 1, users);
};

const seedLikes = (users) => {
  const posts = JSON.parse(fs.readFileSync("./Data/Posts.json", "utf8"));
  seedLike(posts, 0, users);
};

const allComments = [];

const insertCommentsToDataBase = async () => {
  allComments.forEach((comment) => {
    //insert comment to firebase
  });
};

const seedCommentsForPost = async (posts, count, users) => {
  if (count === posts.length) {
    insertCommentsToDataBase();
    return "done";
  }
  //if (posts.length - count < 57) {
  await sleep(40);
  const comments = [];
  while (comments.length < Math.floor(Math.random() * 8)) {
    const num = Math.floor(Math.random() * commentsData.length);
    if (comments.indexOf(commentsData[num]) === -1)
      comments.push(commentsData[num]);
  }
  comments.forEach((comment) => {
    allComments.push({
      body: comment,
      author: users[Math.floor(Math.random() * users.length)],
      likes: [
        users[Math.floor(Math.random() * users.length)],
        users[Math.floor(Math.random() * users.length)],
      ],
      createdDate: Date.now(),
      postId: posts[count].id,
    });
  });
  seedCommentsForPost(posts, count + 1, users);
};

const seedComments = (users) => {
  //get all posts from the database
  seedCommentsForPost(posts, 0, users);
};

getUsers().then((users) => {
  console.log(users);
  //seedLikes(users.map((user) => user.username));
  //seedComments(users.map((user) => user.username));
});
