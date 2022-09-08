import { ClassUtils } from "../utils/ClassUtils";
import { HTMLBrElement } from "./dom/HTMLBrElement";
import { HTMLDivElement } from "./dom/HTMLDivElement";
import { HTMLDivParser } from "./dom/HTMLDivParser";
import { HTMLDocument } from "./dom/HTMLDocument";
import { HTMLElement } from "./dom/HTMLElement";
import { HTMLHitRect } from "./dom/HTMLHitRect";
import { HTMLIframeElement } from "./dom/HTMLIframeElement";
import { HTMLImageElement } from "./dom/HTMLImageElement";
import { HTMLLinkElement } from "./dom/HTMLLinkElement";
import { HTMLStyleElement } from "./dom/HTMLStyleElement";
import { HTMLExtendStyle } from "./utils/HTMLExtendStyle";
import { HTMLParse } from "./utils/HTMLParse";
import { HTMLStyle } from "./utils/HTMLStyle";
import { Layout } from "./utils/Layout";
import { LayoutLine } from "./utils/LayoutLine";

let c = ClassUtils.regClass;
c("HTMLBrElement", HTMLBrElement);
c("HTMLDivElement", HTMLDivElement);
c("HTMLDivParser", HTMLDivParser);
c("HTMLDocument", HTMLDocument);
c("HTMLElement", HTMLElement);
c("HTMLHitRect", HTMLHitRect);
c("HTMLIframeElement", HTMLIframeElement);
c("HTMLImageElement", HTMLImageElement);
c("HTMLLinkElement", HTMLLinkElement);
c("HTMLStyleElement", HTMLStyleElement);
c("HTMLExtendStyle", HTMLExtendStyle);
c("HTMLParse", HTMLParse);
c("HTMLStyle", HTMLStyle);
c("Layout", Layout);
c("LayoutLine", LayoutLine);
c('div', HTMLDivParser);
c('p', HTMLElement);
c('img', HTMLImageElement);
c('span', HTMLElement);
c('br', HTMLBrElement);
c('style', HTMLStyleElement);
c('font', HTMLElement);
c('a', HTMLElement);
c('#text', HTMLElement);
c('link', HTMLLinkElement);