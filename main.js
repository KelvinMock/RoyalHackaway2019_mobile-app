index.html

import {*} from "./modules/setup.js"

import * as posenet from '@tensorflow-models/posenet';
const net = await posenet.load();