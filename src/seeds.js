const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const superagent = require('superagent');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication-client');

const users = [
  {
    name: 'Steve Galili',
    email: 'abc@abc.com',
    password: 'abc123',
  },
  {
    name: 'Jane Doe',
    email: 'efg@efg.com',
    password: 'efg123',
  },
];

const batches = [
  {
    number: 1,
    startDate: new Date(2017, 1, 15),
    endDate: new Date(2017, 3, 15),
    students: [
      {
        name: 'Willem van Oranje Nassau',
        picture: 'https://nl.wikipedia.org/wiki/Willem-Alexander_der_Nederlanden#/media/File:Koning-willem-alexander-okt-15-s.jpg',
        evaluations: [
          {
            color: 3,
            remarks: 'As the king of the Netherlands Im surprised he did not understood today material',
          },
          {
            color: 1,
            remarks: 'Shows improvement, he came today with an assistance from the palace, that is doing everything for him',
          },
        ],
      },
      {
        name: 'Mark Rutte',
        picture: 'https://en.wikipedia.org/wiki/Mark_Rutte#/media/File:Mark_Rutte-6.jpg',
        evaluations: [
          {
            color: 2,
            remarks: 'Answers questions as if he knew what he was talking about but dodges a specific question every time being asked one',
          },
          {
            color: 1,
            remarks: 'Shows progress',
          },
        ],
      },
    ],
  },
  {
    number: 2,
    startDate: new Date(2017, 4, 15),
    endDate:  new Date(2017, 6, 15),
    students: [
      {
        name: 'Abraham Cheesecorner',
        picture: 'http://www.biton.nl/wp-content/uploads/bart.jpg',
        evaluations: [
          {
            color: 1,
            remarks: 'Eats broodje Frikandel during the class, but for the rest shows that he understands the material and helps his neighbours',
          },
          {
            color: 2,
            remarks: 'Did not made his homework, but understood the material somehow',
          },
        ],
      },
      {
        name: 'Hen Shortcheese',
        picture: 'http://e-shamba.com/Poultry/Introduction/Dictionary/Images/Hen(1).JPG',
        evaluations: [
          {
            color: 3,
            remarks: 'Answers the question with hesitation, still need to understand todays lesson about React',
          },
          {
            color: 2,
            remarks: 'Shows improvement since the last period, still struggling with React router',
          },
        ],
      },
    ],
  },
];

const feathersClient = feathers();

feathersClient
  .configure(hooks())
  .configure(rest('http://localhost:3030').superagent(superagent))
  .configure(auth());

feathersClient.service('users').create(users[0])
  .then(() => {
    feathersClient.authenticate({
      strategy: 'local',
      email: users[0].email,
      password: users[0].password
    })
      .then(() => {
        batches.map((batch) => {
          feathersClient.service('batches').create(batch)
            .then((result) => {
              console.log('Batch seeded...', result);
            }).catch((error) => {
              console.error('Error seeding batch!', error.message);
            });
        });
      })
      .catch(function(error){
        console.error('Error authenticating!', error);
      });
  })
  .catch(function(error) {
    console.error('Error creating user!');
  });
