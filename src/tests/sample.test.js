const { databaseCleanUp, databaseSetup } = require("./utils/test-functions");
const { request } = require("graphql-request");

beforeAll(async () => {
  await databaseSetup();
});

test("Testing", async () => {
  const query = `

    mutation AddBlouse($title: String!,$deadline: String!){
      addBlouse(blouseInput:{title:$title,deadline:$deadline}) {
        _id
        title
        deadline
      }
    }
  `;

  const title = "This is a Test Title";
  const deadline = new Date().toString();
  const resposne = await request("http://localhost:8080", query, {
    title,
    deadline
  });

  expect(resposne.addBlouse.title).toBe(title);
  expect(resposne.addBlouse.deadline).toBe(deadline);
  expect(resposne.addBlouse._id).not.toBeUndefined();
});

afterAll(async () => {
  await databaseCleanUp();
});
