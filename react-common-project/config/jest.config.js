/**
 * @author xuyi
 */
import react from "react";
import jsdom from "jsdom";
import "jsdom-global/register";
import "raf/polyfill";
import "babel-polyfill";
import { Response, Request, Headers, fetch } from "whatwg-fetch";

global.Response = Response;
global.Request = Request;
global.Headers = Headers;
global.fetch = fetch;

// global.document = jsdom("<!doctype html><html><body></body></html>");
// global.window = document.defaultView;
// global.navigator = global.window.navigator;

let timer = null;

global.requestAnimationFrame = cb => (timer = setTimeout(cb, 1000 / 60));

global.cancelAnimationFrame = () => global.clearTimeout(timer);

const { JSDOM } = jsdom;
const dom = new JSDOM("<!doctype html><html><body></body></html>");
global.document = dom.window.document;
global.window = dom.window;
