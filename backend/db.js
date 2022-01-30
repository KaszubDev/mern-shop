import mongoose from 'mongoose'
import { url } from './config'

console.log(url)

mongoose.connect(url)
    .then( () => {
        console.log('Connected to database')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })