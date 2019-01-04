import { v4 as uuid } from 'uuid';

export function getRandomUserIndex(usersLength) {
    return Math.floor(Math.random() * usersLength);
}

export function generateUser(users) {
    let user = users[getRandomUserIndex(users.length)];
    user._id = uuid();
    return user;
}
