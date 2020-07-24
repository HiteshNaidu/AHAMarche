import uuid from 'uuid/v1';
import moment from 'moment';

export default [
  {
    id: uuid(),
    name: 'Wooden Chair',
    imageUrl: '../imgs/smartphone.png',
    uploadedAt: moment().subtract(2, 'days')
  },
  {
    id: uuid(),
    name: 'Apple Watch 5',
    imageUrl: '../imgs/smartphone.png',
    uploadedAt: moment().subtract(2, 'days')
  },
  {
    id: uuid(),
    name: 'Sony Speakers',
    imageUrl: '../imgs/smartphone.png',
    uploadedAt: moment().subtract(3, 'days')
  },
  {
    id: uuid(),
    name: 'Apple iPhone 11',
    imageUrl: '../imgs/smartphone.png',
    uploadedAt: moment().subtract(5, 'days')
  },
  {
    id: uuid(),
    name: 'Couch',
    imageUrl: '../imgs/smartphone.png',
    uploadedAt: moment().subtract(9, 'days')
  }
];
