import { userActionsController } from '../userActions/userActionController.js';
import { createAddController } from './createAddController.js'
import { notificationController } from '../notifications/notificationsController.js'
import { pubSub } from '../pubSub.js';


const token = localStorage.getItem('token')
const userActionsElement = document.querySelector('.userActions')
const spinnerElement = document.querySelector('.spinnerHere')
const notificationsElement = document.querySelector('.notifications');

if(!token) {                    //Refuse acces to createAdd webpage without login
    pubSub.publish(pubSub.TOPICS.SHOW_NOTIFICATION, 'You need to be logged if you want to create an add')
    window.location = '/';
} else {
    const createAddFormElement = document.querySelector('#createAddForm');
    createAddController(createAddFormElement, spinnerElement)
};

notificationController(notificationsElement);
userActionsController(userActionsElement);


