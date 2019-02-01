const faker = require('faker');
const axios = require('axios');

const IDEA_GENERATOR = 'https://appideagenerator.com/call.php';
const IDEA_API = 'http://localhost:4000';

const random = () => Math.floor(Math.random() * 10);

const generateIdea = async () => {
  const { data } = await axios.get(IDEA_GENERATOR);

  return data.replace(/\n/g, '');
}

const generateUser = async () => {
  const username = faker.internet.userName();
  const password = 'password';
  const { data } = await axios.post(`${IDEA_API}/register`, { username, password });

  return data.token;
}

const postNewIdea = async token => {
  const idea = await generateIdea();
  const description = faker.lorem.paragraph();
  const { data } = await axios.post(`${IDEA_API}/api/ideas`, { idea, description }, { headers: { authorization: `Bearer ${token}` } });

  console.log(data);
  return idea;
}

(async () => {
  const randomUsers = random();
  const randomeIdea = random();

  for (let i = 0; i < randomUsers; i++) {
    const token = await generateUser();
    for (let j = 0; j < randomUsers; j++) {
      const idea = await postNewIdea(token);
    }
  }

})()
