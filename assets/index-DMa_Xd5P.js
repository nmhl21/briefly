(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const un=()=>{};var We={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wt=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},hn=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const o=t[n++];e[s++]=String.fromCharCode((r&31)<<6|o&63)}else if(r>239&&r<365){const o=t[n++],i=t[n++],a=t[n++],c=((r&7)<<18|(o&63)<<12|(i&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(c>>10)),e[s++]=String.fromCharCode(56320+(c&1023))}else{const o=t[n++],i=t[n++];e[s++]=String.fromCharCode((r&15)<<12|(o&63)<<6|i&63)}}return e.join("")},Ne={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){const o=t[r],i=r+1<t.length,a=i?t[r+1]:0,c=r+2<t.length,l=c?t[r+2]:0,g=o>>2,h=(o&3)<<4|a>>4;let p=(a&15)<<2|l>>6,y=l&63;c||(y=64,i||(p=64)),s.push(n[g],n[h],n[p],n[y])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(wt(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):hn(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){const o=n[t.charAt(r++)],a=r<t.length?n[t.charAt(r)]:0;++r;const l=r<t.length?n[t.charAt(r)]:64;++r;const h=r<t.length?n[t.charAt(r)]:64;if(++r,o==null||a==null||l==null||h==null)throw new fn;const p=o<<2|a>>4;if(s.push(p),l!==64){const y=a<<4&240|l>>2;if(s.push(y),h!==64){const f=l<<6&192|h;s.push(f)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class fn extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const pn=function(t){const e=wt(t);return Ne.encodeByteArray(e,!0)},_t=function(t){return pn(t).replace(/\./g,"")},mn=function(t){try{return Ne.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(t){return Ot(void 0,t)}function Ot(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!gn(n)||(t[n]=Ot(t[n],e[n]));return t}function gn(t){return t!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Me(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yn=()=>Me().__FIREBASE_DEFAULTS__,bn=()=>{if(typeof process>"u"||typeof We>"u")return;const t=We.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},En=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&mn(t[1]);return e&&JSON.parse(e)},wn=()=>{try{return un()||yn()||bn()||En()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},It=()=>{var t;return(t=wn())==null?void 0:t.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oe{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}function Pe(){try{return typeof indexedDB=="object"}catch{return!1}}function _n(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var o;e(((o=r.error)==null?void 0:o.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const On="FirebaseError";class J extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=On,Object.setPrototypeOf(this,J.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Le.prototype.create)}}class Le{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},r=`${this.service}/${e}`,o=this.errors[e],i=o?In(o,s):"Error",a=`${this.serviceName}: ${i} (${r}).`;return new J(r,a,s)}}function In(t,e){try{let n=0,s="";for(;n<t.length;){const r=t.indexOf("{$",n);if(r===-1){s+=t.substring(n);break}const o=t.indexOf("}",r+2);if(o===-1){s+=t.substring(n);break}const i=t.substring(r+2,o),a=e[i];s+=t.substring(n,r)+(a!=null?String(a):`<${i}?>`),n=o+1}return s}catch{return t}}function _e(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const r of n){if(!s.includes(r))return!1;const o=t[r],i=e[r];if(Je(o)&&Je(i)){if(!_e(o,i))return!1}else if(o!==i)return!1}for(const r of s)if(!n.includes(r))return!1;return!0}function Je(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function St(t){return t&&t._delegate?t._delegate:t}class G{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new oe;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(e==null?void 0:e.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(An(e))try{this.getOrInitializeService({instanceIdentifier:x})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const o=this.getOrInitializeService({instanceIdentifier:r});s.resolve(o)}catch{}}}}clearInstance(e=x){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=x){return this.instances.has(e)}getOptions(e=x){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[o,i]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(o);s===a&&i.resolve(r)}return r}onInit(e,n){const s=this.normalizeInstanceIdentifier(n),r=this.onInitCallbacks.get(s)??new Set;r.add(e),this.onInitCallbacks.set(s,r);const o=this.instances.get(s);return o&&e(o,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const r of s)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Tn(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=x){return this.component?this.component.multipleInstances?e:x:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Tn(t){return t===x?void 0:t}function An(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cn{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Sn(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var b;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(b||(b={}));const vn={debug:b.DEBUG,verbose:b.VERBOSE,info:b.INFO,warn:b.WARN,error:b.ERROR,silent:b.SILENT},Rn=b.INFO,Dn={[b.DEBUG]:"log",[b.VERBOSE]:"log",[b.INFO]:"info",[b.WARN]:"warn",[b.ERROR]:"error"},kn=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),r=Dn[e];if(r)console[r](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class $e{constructor(e){this.name=e,this._logLevel=Rn,this._logHandler=kn,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in b))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?vn[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,b.DEBUG,...e),this._logHandler(this,b.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,b.VERBOSE,...e),this._logHandler(this,b.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,b.INFO,...e),this._logHandler(this,b.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,b.WARN,...e),this._logHandler(this,b.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,b.ERROR,...e),this._logHandler(this,b.ERROR,...e)}}const Nn=(t,e)=>e.some(n=>t instanceof n);let Ke,qe;function Mn(){return Ke||(Ke=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Pn(){return qe||(qe=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Tt=new WeakMap,Oe=new WeakMap,At=new WeakMap,ue=new WeakMap,xe=new WeakMap;function Ln(t){const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("success",o),t.removeEventListener("error",i)},o=()=>{n($(t.result)),r()},i=()=>{s(t.error),r()};t.addEventListener("success",o),t.addEventListener("error",i)});return e.then(n=>{n instanceof IDBCursor&&Tt.set(n,t)}).catch(()=>{}),xe.set(e,t),e}function $n(t){if(Oe.has(t))return;const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("complete",o),t.removeEventListener("error",i),t.removeEventListener("abort",i)},o=()=>{n(),r()},i=()=>{s(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",o),t.addEventListener("error",i),t.addEventListener("abort",i)});Oe.set(t,e)}let Ie={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Oe.get(t);if(e==="objectStoreNames")return t.objectStoreNames||At.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return $(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function xn(t){Ie=t(Ie)}function Bn(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(he(this),e,...n);return At.set(s,e.sort?e.sort():[e]),$(s)}:Pn().includes(t)?function(...e){return t.apply(he(this),e),$(Tt.get(this))}:function(...e){return $(t.apply(he(this),e))}}function Fn(t){return typeof t=="function"?Bn(t):(t instanceof IDBTransaction&&$n(t),Nn(t,Mn())?new Proxy(t,Ie):t)}function $(t){if(t instanceof IDBRequest)return Ln(t);if(ue.has(t))return ue.get(t);const e=Fn(t);return e!==t&&(ue.set(t,e),xe.set(e,t)),e}const he=t=>xe.get(t);function Un(t,e,{blocked:n,upgrade:s,blocking:r,terminated:o}={}){const i=indexedDB.open(t,e),a=$(i);return s&&i.addEventListener("upgradeneeded",c=>{s($(i.result),c.oldVersion,c.newVersion,$(i.transaction),c)}),n&&i.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{o&&c.addEventListener("close",()=>o()),r&&c.addEventListener("versionchange",l=>r(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const Gn=["get","getKey","getAll","getAllKeys","count"],Hn=["put","add","delete","clear"],fe=new Map;function Ye(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(fe.get(e))return fe.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,r=Hn.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||Gn.includes(n)))return;const o=async function(i,...a){const c=this.transaction(i,r?"readwrite":"readonly");let l=c.store;return s&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),r&&c.done]))[0]};return fe.set(e,o),o}xn(t=>({...t,get:(e,n,s)=>Ye(e,n)||t.get(e,n,s),has:(e,n)=>!!Ye(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jn{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Vn(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function Vn(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Se="@firebase/app",Xe="0.16.7";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N=new $e("@firebase/app"),zn="@firebase/app-compat",Wn="@firebase/analytics-compat",Jn="@firebase/analytics",Kn="@firebase/app-check-compat",qn="@firebase/app-check",Yn="@firebase/auth",Xn="@firebase/auth-compat",Zn="@firebase/crashlytics",Qn="@firebase/database",es="@firebase/data-connect",ts="@firebase/database-compat",ns="@firebase/functions",ss="@firebase/functions-compat",rs="@firebase/installations",os="@firebase/installations-compat",is="@firebase/messaging",as="@firebase/messaging-compat",cs="@firebase/performance",ls="@firebase/performance-compat",ds="@firebase/remote-config",us="@firebase/remote-config-compat",hs="@firebase/storage",fs="@firebase/storage-compat",ps="@firebase/firestore",ms="@firebase/ai",gs="@firebase/firestore-compat",ys="firebase";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Te="[DEFAULT]",bs={[Se]:"fire-core",[zn]:"fire-core-compat",[Jn]:"fire-analytics",[Wn]:"fire-analytics-compat",[qn]:"fire-app-check",[Kn]:"fire-app-check-compat",[Yn]:"fire-auth",[Xn]:"fire-auth-compat",[Zn]:"fire-cls",[Qn]:"fire-rtdb",[es]:"fire-data-connect",[ts]:"fire-rtdb-compat",[ns]:"fire-fn",[ss]:"fire-fn-compat",[rs]:"fire-iid",[os]:"fire-iid-compat",[is]:"fire-fcm",[as]:"fire-fcm-compat",[cs]:"fire-perf",[ls]:"fire-perf-compat",[ds]:"fire-rc",[us]:"fire-rc-compat",[hs]:"fire-gcs",[fs]:"fire-gcs-compat",[ps]:"fire-fst",[gs]:"fire-fst-compat",[ms]:"fire-vertex","fire-js":"fire-js",[ys]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ie=new Map,Es=new Map,Ae=new Map;function Ze(t,e){try{t.container.addComponent(e)}catch(n){N.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function z(t){const e=t.name;if(Ae.has(e))return N.debug(`There were multiple attempts to register component ${e}.`),!1;Ae.set(e,t);for(const n of ie.values())Ze(n,t);for(const n of Es.values())Ze(n,t);return!0}function Ct(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function ws(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _s={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},k=new Le("app","Firebase",_s);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os{constructor(e,n,s){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new G("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw k.create("app-deleted",{appName:this._name})}}function vt(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s={name:Te,automaticDataCollectionEnabled:!0,...e},r=s.name;if(typeof r!="string"||!r)throw k.create("bad-app-name",{appName:String(r)});if(n||(n=It()),!n)throw k.create("no-options");const o=ie.get(r);if(o)if(_e(n,o.options)){if(_e(s,o.config))return o;throw k.create("duplicate-app",{appName:r,mismatchedParam:"config",oldValue:JSON.stringify(o.config),newValue:JSON.stringify(s)})}else throw k.create("duplicate-app",{appName:r,mismatchedParam:"options",oldValue:JSON.stringify(o.options),newValue:JSON.stringify(n)});const i=new Cn(r);for(const c of Ae.values())i.addComponent(c);const a=new Os(n,s,i);return ie.set(r,a),a}function Rt(t=Te){const e=ie.get(t);if(!e&&t===Te&&It())return vt();if(!e)throw k.create("no-app",{appName:t});return e}function U(t,e,n){let s=bs[t]??t;n&&(s+=`-${n}`);const r=s.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const i=[`Unable to register library "${s}" with version "${e}":`];r&&i.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&i.push("and"),o&&i.push(`version name "${e}" contains illegal characters (whitespace or "/")`),N.warn(i.join(" "));return}z(new G(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Is="firebase-heartbeat-database",Ss=1,X="firebase-heartbeat-store";let pe=null;function Dt(){return pe||(pe=Un(Is,Ss,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(X)}catch(n){console.warn(n)}}}}).catch(t=>{throw k.create("idb-open",{originalErrorMessage:t.message})})),pe}async function Ts(t){try{const n=(await Dt()).transaction(X),s=await n.objectStore(X).get(kt(t));return await n.done,s}catch(e){if(e instanceof J)N.warn(e.message);else{const n=k.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});N.warn(n.message)}}}async function Qe(t,e){try{const s=(await Dt()).transaction(X,"readwrite");await s.objectStore(X).put(e,kt(t)),await s.done}catch(n){if(n instanceof J)N.warn(n.message);else{const s=k.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});N.warn(s.message)}}}function kt(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const As=1024,Cs=30;class vs{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Ds(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,n;try{const r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=et();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(i=>i.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:r}),this._heartbeatsCache.heartbeats.length>Cs){const i=ks(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){N.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=et(),{heartbeatsToSend:s,unsentEntries:r}=Rs(this._heartbeatsCache.heartbeats),o=_t(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=n,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(n){return N.warn(n),""}}}function et(){return new Date().toISOString().substring(0,10)}function Rs(t,e=As){const n=[];let s=t.slice();for(const r of t){const o=n.find(i=>i.agent===r.agent);if(o){if(o.dates.push(r.date),tt(n)>e){o.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),tt(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class Ds{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Pe()?_n().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Ts(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Qe(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Qe(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function tt(t){return _t(JSON.stringify({version:2,heartbeats:t})).length}function ks(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ns(t){z(new G("platform-logger",e=>new jn(e),"PRIVATE")),z(new G("heartbeat",e=>new vs(e),"PRIVATE")),U(Se,Xe,t),U(Se,Xe,"esm2020"),U("fire-js","")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ns("");var Ms="firebase",Ps="13.4.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */U(Ms,Ps,"app");var nt="@firebase/ai",Ce="3.1.0";/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W="AI",Ls="global",$s="firebasevertexai.googleapis.com",ae="v1beta",st=Ce,xs="gl-js",Bs="hybrid",Fs=180*1e3,Us="gemini-3.5-flash-lite";/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u extends J{constructor(e,n,s){const r=W,o=`${r}/${e}`,i=`${r}: ${n} (${o})`;super(e,i),this.code=e,this.customErrorData=s,Error.captureStackTrace&&Error.captureStackTrace(this,u),Object.setPrototypeOf(this,u.prototype),this.toString=()=>i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rt=["user","model","function","system"],Nt={HARM_SEVERITY_UNSUPPORTED:"HARM_SEVERITY_UNSUPPORTED"},O={SAFETY:"SAFETY",RECITATION:"RECITATION",BLOCKLIST:"BLOCKLIST",PROHIBITED_CONTENT:"PROHIBITED_CONTENT",SPII:"SPII",MALFORMED_FUNCTION_CALL:"MALFORMED_FUNCTION_CALL",IMAGE_SAFETY:"IMAGE_SAFETY",IMAGE_PROHIBITED_CONTENT:"IMAGE_PROHIBITED_CONTENT",IMAGE_OTHER:"IMAGE_OTHER",NO_IMAGE:"NO_IMAGE",IMAGE_RECITATION:"IMAGE_RECITATION",LANGUAGE:"LANGUAGE",UNEXPECTED_TOOL_CALL:"UNEXPECTED_TOOL_CALL",TOO_MANY_TOOL_CALLS:"TOO_MANY_TOOL_CALLS",MISSING_THOUGHT_SIGNATURE:"MISSING_THOUGHT_SIGNATURE",MALFORMED_RESPONSE:"MALFORMED_RESPONSE"},_={PREFER_ON_DEVICE:"prefer_on_device",ONLY_ON_DEVICE:"only_on_device",ONLY_IN_CLOUD:"only_in_cloud",PREFER_IN_CLOUD:"prefer_in_cloud"},P={ON_DEVICE:"on_device",IN_CLOUD:"in_cloud"};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d={ERROR:"error",REQUEST_ERROR:"request-error",RESPONSE_ERROR:"response-error",FETCH_ERROR:"fetch-error",SESSION_CLOSED:"session-closed",INVALID_CONTENT:"invalid-content",API_NOT_ENABLED:"api-not-enabled",ALREADY_INITIALIZED:"already-initialized",INVALID_SCHEMA:"invalid-schema",NO_API_KEY:"no-api-key",NO_APP_ID:"no-app-id",NO_MODEL:"no-model",NO_PROJECT_ID:"no-project-id",PARSE_FAILED:"parse-failed",UNSUPPORTED:"unsupported"};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const H={STRING:"string",NUMBER:"number",INTEGER:"integer",BOOLEAN:"boolean",ARRAY:"array",OBJECT:"object"};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M={AGENT_PLATFORM:"AGENT_PLATFORM",GOOGLE_AI:"GOOGLE_AI"};/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(e){this.backendType=e}}class le extends Mt{constructor(){super(M.GOOGLE_AI)}_getModelPath(e,n){return`/${ae}/projects/${e}/${n}`}_getTemplatePath(e,n){return`/${ae}/projects/${e}/templates/${n}`}}class Pt extends Mt{constructor(e){super(M.AGENT_PLATFORM),this.location=Ls,e&&(this.location=e)}_getModelPath(e,n){return`/${ae}/projects/${e}/locations/${this.location}/${n}`}_getTemplatePath(e,n){return`/${ae}/projects/${e}/locations/${this.location}/templates/${n}`}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gs(t){if(t instanceof le)return`${W}/googleai`;if(t instanceof Pt)return`${W}/agentplatform/${t.location}`;throw new u(d.ERROR,`Invalid backend: ${JSON.stringify(t.backendType)}`)}function Hs(t){const e=t.split("/");if(e[0]!==W)throw new u(d.ERROR,`Invalid instance identifier, unknown prefix '${e[0]}'`);switch(e[1]){case"agentplatform":const s=e[2];if(!s)throw new u(d.ERROR,`Invalid instance identifier, unknown location '${t}'`);return new Pt(s);case"googleai":return new le;default:throw new u(d.ERROR,`Invalid instance identifier string: '${t}'`)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E=new $e("@firebase/ai");var D;(function(t){t.UNAVAILABLE="unavailable",t.DOWNLOADABLE="downloadable",t.DOWNLOADING="downloading",t.AVAILABLE="available"})(D||(D={}));/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lt={type:"text",languages:["en"]},me=[Lt,{type:"image"}],ge=[Lt];class A{constructor(e,n,s){this.languageModelProvider=e,this.mode=n,this.downloadPromise=null,this.onDeviceParams={createOptions:{expectedInputs:me,expectedOutputs:ge}},s&&(this.onDeviceParams=s,this.onDeviceParams.createOptions?(this.onDeviceParams.createOptions.expectedInputs||(this.onDeviceParams.createOptions.expectedInputs=me),this.onDeviceParams.createOptions.expectedOutputs||(this.onDeviceParams.createOptions.expectedOutputs=ge)):this.onDeviceParams.createOptions={expectedInputs:me,expectedOutputs:ge})}async isAvailable(e){var s;if(!this.mode)return E.debug("On-device inference unavailable because mode is undefined."),!1;if(this.mode===_.ONLY_IN_CLOUD)return E.debug('On-device inference unavailable because mode is "only_in_cloud".'),!1;const n=await((s=this.languageModelProvider)==null?void 0:s.availability(this.onDeviceParams.createOptions));if(this.mode===_.ONLY_ON_DEVICE){if(n===D.UNAVAILABLE)throw new u(d.API_NOT_ENABLED,"Local LanguageModel API not available in this environment.");if(n===D.DOWNLOADABLE||n===D.DOWNLOADING){E.debug("Waiting for download of LanguageModel to complete.");try{await this.downloadPromise}catch(r){throw new u(d.ERROR,r.message)}return!0}return!0}return n!==D.AVAILABLE?(E.debug(`On-device inference unavailable because availability is "${n}".`),!1):A.isOnDeviceRequest(e)?!0:(E.debug("On-device inference unavailable because request is incompatible."),!1)}async generateContent(e){const n=await this.createSession(),s=await Promise.all(e.contents.map(A.toLanguageModelMessage)),r=await n.prompt(s,this.onDeviceParams.promptOptions);return A.toResponse(r)}async generateContentStream(e){const n=await this.createSession(),s=await Promise.all(e.contents.map(A.toLanguageModelMessage)),r=n.promptStreaming(s,this.onDeviceParams.promptOptions);return A.toStreamResponse(r)}async countTokens(e){throw new u(d.REQUEST_ERROR,"Count Tokens is not yet available for on-device model.")}static isOnDeviceRequest(e){if(e.contents.length===0)return E.debug("Empty prompt rejected for on-device inference."),!1;for(const n of e.contents){if(n.parts.some(s=>"functionResponse"in s))return E.debug("Content with a function response part rejected for on-device inference."),!1;for(const s of n.parts)if("inlineData"in s&&s.inlineData&&A.SUPPORTED_MIME_TYPES.indexOf(s.inlineData.mimeType)===-1)return E.debug(`Unsupported mime type "${s.inlineData.mimeType}" rejected for on-device inference.`),!1}return!0}async downloadIfAvailable(e){var s;const n=await((s=this.languageModelProvider)==null?void 0:s.availability(this.onDeviceParams.createOptions));return(n===D.DOWNLOADABLE||n===D.DOWNLOADING)&&this.download(e),n}download(e){var s;if(this.downloadPromise)return;const n={...this.onDeviceParams.createOptions};n&&!n.monitor&&e&&(n.monitor=r=>{r.addEventListener("downloadprogress",o=>{e(o.loaded)})}),this.downloadPromise=(s=this.languageModelProvider)==null?void 0:s.create(n).finally(()=>{this.downloadPromise=null})}static async toLanguageModelMessage(e){const n=await Promise.all(e.parts.map(A.toLanguageModelMessageContent));return{role:A.toLanguageModelMessageRole(e.role),content:n}}static async toLanguageModelMessageContent(e){if("text"in e&&typeof e.text=="string")return{type:"text",value:e.text};if("inlineData"in e&&e.inlineData){const s=await(await fetch(`data:${e.inlineData.mimeType};base64,${e.inlineData.data}`)).blob();return{type:"image",value:await createImageBitmap(s)}}throw new u(d.REQUEST_ERROR,"Processing of this Part type is not currently supported.")}static toLanguageModelMessageRole(e){return e==="model"?"assistant":"user"}async createSession(){if(!this.languageModelProvider)throw new u(d.UNSUPPORTED,"Chrome AI requested for unsupported browser version.");const e=await this.languageModelProvider.create(this.onDeviceParams.createOptions);return this.oldSession&&this.oldSession.destroy(),this.oldSession=e,e}static toResponse(e){return{json:async()=>({candidates:[{content:{parts:[{text:e}]}}]})}}static toStreamResponse(e){const n=new TextEncoder;return{body:e.pipeThrough(new TransformStream({transform(s,r){const o=JSON.stringify({candidates:[{content:{role:"model",parts:[{text:s}]}}]});r.enqueue(n.encode(`data: ${o}

`))}}))}}}A.SUPPORTED_MIME_TYPES=["image/jpeg","image/png"];function js(t,e,n){const r=(e||Me()).LanguageModel;if(r&&t)return new A(r,t,n)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vs{constructor(e,n,s,r,o){this.app=e,this.backend=n,this.chromeAdapterFactory=o;const i=r==null?void 0:r.getImmediate({optional:!0}),a=s==null?void 0:s.getImmediate({optional:!0});this.auth=a||null,this.appCheck=i||null}_delete(){return Promise.resolve()}set options(e){this._options=e}get options(){return this._options}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zs(t,{instanceIdentifier:e}){if(!e)throw new u(d.ERROR,"AIService instance identifier is undefined.");const n=Hs(e),s=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),o=t.getProvider("app-check-internal");return new Vs(s,n,r,o,js)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ws(t){var n,s,r,o,i,a,c;if((s=(n=t.app)==null?void 0:n.options)!=null&&s.apiKey)if((o=(r=t.app)==null?void 0:r.options)!=null&&o.projectId){if(!((a=(i=t.app)==null?void 0:i.options)!=null&&a.appId))throw new u(d.NO_APP_ID,'The "appId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid app ID.')}else throw new u(d.NO_PROJECT_ID,'The "projectId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid project ID.');else throw new u(d.NO_API_KEY,'The "apiKey" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid API key.');const e={apiKey:t.app.options.apiKey,project:t.app.options.projectId,appId:t.app.options.appId,automaticDataCollectionEnabled:t.app.automaticDataCollectionEnabled,backend:t.backend};if(ws(t.app)&&t.app.settings.appCheckToken){const l=t.app.settings.appCheckToken;e.getAppCheckToken=()=>Promise.resolve({token:l})}else t.appCheck&&((c=t.options)!=null&&c.useLimitedUseAppCheckTokens?e.getAppCheckToken=()=>t.appCheck.getLimitedUseToken():e.getAppCheckToken=()=>t.appCheck.getToken());return t.auth&&(e.getAuthToken=()=>t.auth.getToken()),e}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q{constructor(e,n){this._apiSettings=Ws(e),this.model=q.normalizeModelName(n,this._apiSettings.backend.backendType)}static normalizeModelName(e,n){return n===M.GOOGLE_AI?q.normalizeGoogleAIModelName(e):q.normalizeVertexAIModelName(e)}static normalizeGoogleAIModelName(e){return`models/${e}`}static normalizeVertexAIModelName(e){let n;return e.includes("/")?e.startsWith("models/")?n=`publishers/google/${e}`:n=e:n=`publishers/google/models/${e}`,n}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Js="Timeout has expired.",ye="AbortError";class Ks{constructor(e){this.params=e}toString(){const e=new URL(this.baseUrl);return e.pathname=this.pathname,e.search=this.queryParams.toString(),e.toString()}get pathname(){return this.params.templateId?`${this.params.apiSettings.backend._getTemplatePath(this.params.apiSettings.project,this.params.templateId)}:${this.params.task}`:`${this.params.apiSettings.backend._getModelPath(this.params.apiSettings.project,this.params.model)}:${this.params.task}`}get baseUrl(){var e;return((e=this.params.singleRequestOptions)==null?void 0:e.baseUrl)??`https://${$s}`}get queryParams(){const e=new URLSearchParams;return this.params.stream&&e.set("alt","sse"),e}}function qs(t){const e=[];return e.push(`${xs}/${st}`),e.push(`fire/${st}`),(t.params.apiSettings.inferenceMode===_.PREFER_ON_DEVICE||t.params.apiSettings.inferenceMode===_.PREFER_IN_CLOUD)&&e.push(Bs),e.join(" ")}async function Ys(t){const e=new Headers;if(e.append("Content-Type","application/json"),e.append("x-goog-api-client",qs(t)),e.append("x-goog-api-key",t.params.apiSettings.apiKey),t.params.apiSettings.automaticDataCollectionEnabled&&e.append("X-Firebase-Appid",t.params.apiSettings.appId),t.params.apiSettings.getAppCheckToken){const n=await t.params.apiSettings.getAppCheckToken();n&&(e.append("X-Firebase-AppCheck",n.token),n.error&&E.warn(`Unable to obtain a valid App Check token: ${n.error.message}`))}if(t.params.apiSettings.getAuthToken){const n=await t.params.apiSettings.getAuthToken();n&&e.append("Authorization",`Firebase ${n.accessToken}`)}return e}async function Be(t,e){var l,g;const n=new Ks(t);let s;const r=(l=t.singleRequestOptions)==null?void 0:l.signal,o=((g=t.singleRequestOptions)==null?void 0:g.timeout)!=null&&t.singleRequestOptions.timeout>=0?t.singleRequestOptions.timeout:Fs,i=new AbortController,a=setTimeout(()=>{i.abort(new DOMException(Js,ye)),E.debug(`Aborting request to ${n} due to timeout (${o}ms)`)},o),c=AbortSignal.any(r?[r,i.signal]:[i.signal]);if(r&&r.aborted)throw clearTimeout(a),new DOMException(r.reason??"Aborted externally before fetch",ye);try{const h={method:"POST",headers:await Ys(n),signal:c,body:e};if(s=await fetch(n.toString(),h),!s.ok){let p="",y;try{const f=await s.json();p=f.error.message,f.error.details&&(p+=` ${JSON.stringify(f.error.details)}`,y=f.error.details)}catch{}throw s.status===403&&y&&y.some(f=>f.reason==="SERVICE_DISABLED")&&y.some(f=>{var I,Q;return(Q=(I=f.links)==null?void 0:I[0])==null?void 0:Q.description.includes("Google developers console API activation")})?new u(d.API_NOT_ENABLED,`The Firebase AI SDK requires the Firebase AI API ('firebasevertexai.googleapis.com') to be enabled in your Firebase project. Enable this API by visiting the Firebase Console at https://console.firebase.google.com/project/${n.params.apiSettings.project}/ailogic/ and clicking "Get started". If you enabled this API recently, wait a few minutes for the action to propagate to our systems and then retry.`,{status:s.status,statusText:s.statusText,errorDetails:y}):new u(d.FETCH_ERROR,`Error fetching from ${n}: [${s.status} ${s.statusText}] ${p}`,{status:s.status,statusText:s.statusText,errorDetails:y})}}catch(h){let p=h;throw h.code!==d.FETCH_ERROR&&h.code!==d.API_NOT_ENABLED&&h instanceof Error&&h.name!==ye&&(p=new u(d.ERROR,`Error fetching from ${n.toString()}: ${h.message}`),p.stack=h.stack),p}finally{clearTimeout(a)}return s}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ee(t){if(t.candidates&&t.candidates.length>0){if(t.candidates.length>1&&E.warn(`This response had ${t.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),xt(t.candidates[0]))throw new u(d.RESPONSE_ERROR,`Response error: ${B(t)}. Response body stored in error.response`,{response:t});return!0}else return!1}function R(t){return"type"in t&&t.type?t:t.text!==void 0?{...t,type:"text"}:t.inlineData!==void 0?{...t,type:"inlineData"}:t.functionCall!==void 0?{...t,type:"functionCall"}:t.functionResponse!==void 0?{...t,type:"functionResponse"}:t.fileData!==void 0?{...t,type:"fileData"}:t.executableCode!==void 0?{...t,type:"executableCode"}:t.codeExecutionResult!==void 0?{...t,type:"codeExecutionResult"}:t}function ce(t,e=P.IN_CLOUD){var s,r;if((s=t.candidates)!=null&&s[0]&&!t.candidates[0].hasOwnProperty("index")&&(t.candidates[0].index=0),t.candidates)for(const o of t.candidates)(r=o.content)!=null&&r.parts&&(o.content.parts=o.content.parts.map(R));const n=Xs(t);return n.inferenceSource=e,n}function Xs(t){return t.text=()=>{if(ee(t))return ot(t,e=>!("thought"in e&&e.thought));if(t.promptFeedback)throw new u(d.RESPONSE_ERROR,`Text not available. ${B(t)}`,{response:t});return""},t.thoughtSummary=()=>{if(ee(t)){const e=ot(t,n=>!!("thought"in n&&n.thought));return e===""?void 0:e}else if(t.promptFeedback)throw new u(d.RESPONSE_ERROR,`Thought summary not available. ${B(t)}`,{response:t})},t.inlineDataParts=()=>{if(ee(t))return Zs(t);if(t.promptFeedback)throw new u(d.RESPONSE_ERROR,`Data not available. ${B(t)}`,{response:t})},t.functionCalls=()=>{if(ee(t))return $t(t);if(t.promptFeedback)throw new u(d.RESPONSE_ERROR,`Function call not available. ${B(t)}`,{response:t})},t}function ot(t,e){var s,r,o,i;const n=[];if((r=(s=t.candidates)==null?void 0:s[0].content)!=null&&r.parts)for(const a of(i=(o=t.candidates)==null?void 0:o[0].content)==null?void 0:i.parts){const c=R(a);c.type==="text"&&e(c)&&n.push(c.text)}return n.length>0?n.join(""):""}function $t(t){var n,s,r,o;if(!t)return;const e=[];if((s=(n=t.candidates)==null?void 0:n[0].content)!=null&&s.parts)for(const i of(o=(r=t.candidates)==null?void 0:r[0].content)==null?void 0:o.parts){const a=R(i);a.type==="functionCall"&&e.push(a.functionCall)}if(e.length>0)return e}function Zs(t){var n,s,r,o;const e=[];if((s=(n=t.candidates)==null?void 0:n[0].content)!=null&&s.parts)for(const i of(o=(r=t.candidates)==null?void 0:r[0].content)==null?void 0:o.parts){const a=R(i);a.type==="inlineData"&&e.push(a)}if(e.length>0)return e}const Qs=[O.RECITATION,O.SAFETY,O.BLOCKLIST,O.PROHIBITED_CONTENT,O.SPII,O.MALFORMED_FUNCTION_CALL,O.IMAGE_SAFETY,O.IMAGE_PROHIBITED_CONTENT,O.IMAGE_OTHER,O.NO_IMAGE,O.IMAGE_RECITATION,O.LANGUAGE,O.UNEXPECTED_TOOL_CALL,O.TOO_MANY_TOOL_CALLS,O.MISSING_THOUGHT_SIGNATURE,O.MALFORMED_RESPONSE];function xt(t){return!!t.finishReason&&Qs.some(e=>e===t.finishReason)}function B(t){var n,s,r;let e="";if((!t.candidates||t.candidates.length===0)&&t.promptFeedback)e+="Response was blocked",(n=t.promptFeedback)!=null&&n.blockReason&&(e+=` due to ${t.promptFeedback.blockReason}`),(s=t.promptFeedback)!=null&&s.blockReasonMessage&&(e+=`: ${t.promptFeedback.blockReasonMessage}`);else if((r=t.candidates)!=null&&r[0]){const o=t.candidates[0];xt(o)&&(e+=`Candidate was blocked due to ${o.finishReason}`,o.finishMessage&&(e+=`: ${o.finishMessage}`))}return e}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fe(t){if(t!=null){if(typeof t=="string")return{role:"system",parts:[{type:"text",text:t}]};if(t.type==="text"||"text"in t&&typeof t.text=="string")return{role:"system",parts:[F(R(t))]};if(t.parts){const e=t.parts.map(n=>F(R(n)));return t.role?{...t,parts:e}:{role:"system",parts:e}}}}function K(t){let e=[];if(typeof t=="string")e=[{type:"text",text:t}];else for(const n of t)typeof n=="string"?e.push({type:"text",text:n}):e.push(F(R(n)));return er(e)}function er(t){const e={role:"user",parts:[]};let n=!1,s=!1;for(const r of t)r.type==="functionResponse"||"functionResponse"in r?s=!0:n=!0,e.parts.push(r);if(n&&s)throw new u(d.INVALID_CONTENT,"Within a single message, FunctionResponse cannot be mixed with other type of Part in the request for sending chat message.");if(!n&&!s)throw new u(d.INVALID_CONTENT,"No Content is provided for sending chat message.");return e}function be(t){let e;if(t.contents){const n=t;e={...n,contents:n.contents.map(s=>({...s,parts:s.parts?s.parts.map(R):[]}))}}else e={contents:[K(t)]};return t.systemInstruction&&(e.systemInstruction=Fe(t.systemInstruction)),e}function tr(t){return t.parts&&Array.isArray(t.parts)?{...t,parts:t.parts.map(Ue)}:t}function Ue(t){let e;if("type"in t){const{type:n,...s}=t;e=s}else e=t;return e.functionResponse&&(e={...e,functionResponse:tr(e.functionResponse)}),e}function Ge(t){return t.parts?{...t,parts:t.parts.map(Ue)}:t}function Bt(t){return t==null||typeof t=="string"?t:"parts"in t&&Array.isArray(t.parts)?Ge(t):Ue(t)}function Ft(t){const e={...t};return e.contents&&(e.contents=e.contents.map(Ge)),e.systemInstruction&&(e.systemInstruction=Bt(e.systemInstruction)),e}function nr(t){const e={...t};return e.contents&&(e.contents=e.contents.map(Ge)),e.systemInstruction&&(e.systemInstruction=Bt(e.systemInstruction)),e}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ut(t){var e,n;if((e=t.safetySettings)==null||e.forEach(s=>{if(s.method)throw new u(d.UNSUPPORTED,"SafetySetting.method is not supported in the the Gemini Developer API. Please remove this property.")}),(n=t.generationConfig)!=null&&n.topK){const s=Math.round(t.generationConfig.topK);s!==t.generationConfig.topK&&(E.warn("topK in GenerationConfig has been rounded to the nearest integer to match the format for requests to the Gemini Developer API."),t.generationConfig.topK=s)}return t}function He(t){return{candidates:t.candidates?rr(t.candidates):void 0,promptFeedback:t.promptFeedback?or(t.promptFeedback):void 0,usageMetadata:t.usageMetadata}}function sr(t,e){return{generateContentRequest:{model:e,...t}}}function rr(t){const e=[];let n;return e&&t.forEach(s=>{var i,a;let r;if(s.citationMetadata&&(r={citations:s.citationMetadata.citationSources}),s.safetyRatings&&(n=s.safetyRatings.map(c=>({...c,severity:c.severity??Nt.HARM_SEVERITY_UNSUPPORTED,probabilityScore:c.probabilityScore??0,severityScore:c.severityScore??0}))),(a=(i=s.content)==null?void 0:i.parts)!=null&&a.some(c=>"videoMetadata"in c&&c.videoMetadata))throw new u(d.UNSUPPORTED,"Part.videoMetadata is not supported in the Gemini Developer API. Please remove this property.");const o={index:s.index,content:s.content,finishReason:s.finishReason,finishMessage:s.finishMessage,safetyRatings:n,citationMetadata:r,groundingMetadata:s.groundingMetadata,urlContextMetadata:s.urlContextMetadata};e.push(o)}),e}function or(t){const e=[];return(t.safetyRatings??[]).forEach(s=>{e.push({category:s.category,probability:s.probability,severity:s.severity??Nt.HARM_SEVERITY_UNSUPPORTED,probabilityScore:s.probabilityScore??0,severityScore:s.severityScore??0,blocked:s.blocked})}),{blockReason:t.blockReason,safetyRatings:e,blockReasonMessage:t.blockReasonMessage}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const it=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;async function ir(t,e,n){const s=t.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),r=dr(s),[o,i]=r.tee(),{response:a,firstValue:c}=await ar(i,e,n);return{stream:lr(o,e,n),response:a,firstValue:c}}async function ar(t,e,n){const[s,r]=t.tee(),o=s.getReader(),{value:i}=await o.read();return{firstValue:i,response:cr(r,e,n)}}async function cr(t,e,n){const s=[],r=t.getReader();for(;;){const{done:o,value:i}=await r.read();if(o){let a=ur(s);return e.backend.backendType===M.GOOGLE_AI&&(a=He(a)),ce(a,n)}s.push(i)}}async function*lr(t,e,n){var r,o;const s=t.getReader();for(;;){const{value:i,done:a}=await s.read();if(a)break;let c;e.backend.backendType===M.GOOGLE_AI?c=ce(He(i),n):c=ce(i,n);const l=(r=c.candidates)==null?void 0:r[0];!((o=l==null?void 0:l.content)!=null&&o.parts)&&!(l!=null&&l.finishReason)&&!(l!=null&&l.citationMetadata)&&!(l!=null&&l.urlContextMetadata)||(yield c)}}function dr(t){const e=t.getReader();return new ReadableStream({start(s){let r="";return o();function o(){return e.read().then(({value:i,done:a})=>{if(a){if(r.trim()){s.error(new u(d.PARSE_FAILED,"Failed to parse stream"));return}s.close();return}r+=i;let c=r.match(it),l;for(;c;){try{l=JSON.parse(c[1])}catch{s.error(new u(d.PARSE_FAILED,`Error parsing JSON response: "${c[1]}`));return}s.enqueue(l),r=r.substring(c[0].length),c=r.match(it)}return o()})}}})}function ur(t){const e=t[t.length-1],n={promptFeedback:e==null?void 0:e.promptFeedback};for(const s of t)if(s.candidates)for(const r of s.candidates){const o=r.index||0;n.candidates||(n.candidates=[]),n.candidates[o]||(n.candidates[o]={index:r.index}),n.candidates[o].citationMetadata=r.citationMetadata,n.candidates[o].finishReason=r.finishReason,n.candidates[o].finishMessage=r.finishMessage,n.candidates[o].safetyRatings=r.safetyRatings,n.candidates[o].groundingMetadata=r.groundingMetadata;const i=r.urlContextMetadata;if(typeof i=="object"&&i!==null&&Object.keys(i).length>0&&(n.candidates[o].urlContextMetadata=i),r.content){if(!r.content.parts)continue;n.candidates[o].content||(n.candidates[o].content={role:r.content.role||"user",parts:[]});for(const a of r.content.parts){if("text"in a&&a.text==="")continue;if(Object.keys(a).length===0)throw new u(d.INVALID_CONTENT,"Part should have at least one property, but there are none. This is likely caused by a malformed response from the backend.");const c=R({...a});Object.keys(c).length>0&&n.candidates[o].content.parts.push(c)}}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hr=[d.FETCH_ERROR,d.ERROR,d.API_NOT_ENABLED];async function Gt(t,e,n,s){if(!e)return{response:await s(),inferenceSource:P.IN_CLOUD};switch(e.mode){case _.ONLY_ON_DEVICE:if(await e.isAvailable(t))return{response:await n(),inferenceSource:P.ON_DEVICE};throw new u(d.UNSUPPORTED,"Inference mode is ONLY_ON_DEVICE, but an on-device model is not available.");case _.ONLY_IN_CLOUD:return{response:await s(),inferenceSource:P.IN_CLOUD};case _.PREFER_IN_CLOUD:try{return{response:await s(),inferenceSource:P.IN_CLOUD}}catch(r){if(r instanceof u&&hr.includes(r.code)&&await e.isAvailable(t))return{response:await n(),inferenceSource:P.ON_DEVICE};throw r}case _.PREFER_ON_DEVICE:return await e.isAvailable(t)?{response:await n(),inferenceSource:P.ON_DEVICE}:{response:await s(),inferenceSource:P.IN_CLOUD};default:throw new u(d.ERROR,`Unexpected infererence mode: ${e.mode}`)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fr(t,e,n,s){return n=Ft(n),t.backend.backendType===M.GOOGLE_AI&&(n=Ut(n)),Be({task:"streamGenerateContent",model:e,apiSettings:t,stream:!0,singleRequestOptions:s},JSON.stringify(n))}async function Ht(t,e,n,s,r){const o=await Gt(n,s,()=>s.generateContentStream(n),()=>fr(t,e,n,r));return ir(o.response,t,o.inferenceSource)}async function pr(t,e,n,s){return n=Ft(n),t.backend.backendType===M.GOOGLE_AI&&(n=Ut(n)),Be({model:e,task:"generateContent",apiSettings:t,stream:!1,singleRequestOptions:s},JSON.stringify(n))}async function jt(t,e,n,s,r){const o=await Gt(n,s,()=>s.generateContent(n),()=>pr(t,e,n,r)),i=await mr(o.response,t);return{response:ce(i,o.inferenceSource)}}async function mr(t,e){const n=await t.json();return e.backend.backendType===M.GOOGLE_AI?He(n):n}/**
 * @license
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const at="SILENT_ERROR",ct=10;class gr{constructor(e,n,s){this.params=n,this.requestOptions=s,this._history=[],this._sendPromise=Promise.resolve(),this._apiSettings=e}async getHistory(){return await this._sendPromise,F(this._history).map(e=>({...e,parts:e.parts?e.parts.map(R):[]}))}async _sendMessage(e,n){let s={};await this._sendPromise;const r=[];return this._sendPromise=this._sendPromise.then(async()=>{var c,l,g;let o,i=0;const a=((c=this.requestOptions)==null?void 0:c.maxSequentialFunctionCalls)??ct;do{let h;if(o){i++;const f=await this._callFunctionsAsNeeded(o);h=K(f)}else h=K(e);const p=this._formatRequest(h,[...r]);r.push(h);const y=await this._callGenerateContent(p,n);if(y)if(s=y,o=this._getCallableFunctionCalls(y.response),y.response.candidates&&y.response.candidates.length>0){const f={parts:((l=y.response.candidates)==null?void 0:l[0].content.parts)||[],role:((g=y.response.candidates)==null?void 0:g[0].content.role)||"model"};r.push(F(f))}else{const f=B(y.response);f&&E.warn(`sendMessage() was unsuccessful. ${f}. Inspect response object for details.`)}else o=void 0}while(o&&i<a);o&&i>=a&&E.warn(`Automatic function calling exceeded the limit of ${a} function calls. Returning last model response.`)}),await this._sendPromise,this._history=this._history.concat(r),s}async _sendMessageStream(e,n){await this._sendPromise;const s=[],o=(async()=>{var g;let i,a=0;const c=((g=this.requestOptions)==null?void 0:g.maxSequentialFunctionCalls)??ct;let l;do{let h;if(i){a++;const y=await this._callFunctionsAsNeeded(i);h=K(y)}else h=K(e);const p=this._formatRequest(h,[...s]);if(s.push(h),l=await this._callGenerateContentStream(p,n),i=this._getCallableFunctionCalls(l.firstValue),i&&l.firstValue&&l.firstValue.candidates&&l.firstValue.candidates.length>0){const y={...l.firstValue.candidates[0].content};y.role||(y.role="model"),s.push(y)}}while(i&&a<c);return i&&a>=c&&E.warn(`Automatic function calling exceeded the limit of ${c} function calls. Returning last model response.`),{stream:l.stream,response:l.response}})();return this._sendPromise=this._sendPromise.then(async()=>o).catch(i=>{throw new Error(at)}).then(i=>i.response).then(i=>{if(i.candidates&&i.candidates.length>0){this._history=this._history.concat(s);const a={...i.candidates[0].content};a.role||(a.role="model"),this._history.push(F(a))}else{const a=B(i);a&&E.warn(`sendMessageStream() was unsuccessful. ${a}. Inspect response object for details.`)}}).catch(i=>{i.message!==at&&i.name!=="AbortError"&&E.error(i)}),o}_getCallableFunctionCalls(e){var r,o,i;const n=(o=(r=this.params)==null?void 0:r.tools)==null?void 0:o.find(a=>a.functionDeclarations);if(!(n!=null&&n.functionDeclarations))return;const s=$t(e);if(s){for(const a of s)if(!((i=n.functionDeclarations)==null?void 0:i.some(l=>l.name===a.name&&typeof l.functionReference=="function")))return;return s}}async _callFunctionsAsNeeded(e){var o,i;const n=[],s=[],r=(i=(o=this.params)==null?void 0:o.tools)==null?void 0:i.find(a=>a.functionDeclarations);if(r&&r.functionDeclarations){for(const c of e){const l=r.functionDeclarations.find(g=>g.name===c.name);if(l!=null&&l.functionReference){const g=Promise.resolve(l.functionReference(c.args)).catch(h=>{const p=new u(d.ERROR,`Error in user-defined function "${l.name}": ${h.message}`);throw p.stack=h.stack,p});n.push({name:c.name,id:c.id,results:g}),s.push(g)}}await Promise.all(s);const a=[];for(const{name:c,id:l,results:g}of n){const h={name:c,response:await g};l&&(h.id=l),a.push({type:"functionResponse",functionResponse:h})}return a}else throw new u(d.REQUEST_ERROR,'No function declarations were provided in "tools".')}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yr=["text","inlineData","functionCall","functionResponse","thought","thoughtSignature"],br={user:["text","inlineData","functionResponse"],function:["functionResponse"],model:["text","functionCall","thought","thoughtSignature"],system:["text"]},lt={user:["model"],function:["model"],model:["user","function"],system:[]};function Er(t){let e=null;for(const n of t){const{role:s,parts:r}=n;if(!e&&s!=="user")throw new u(d.INVALID_CONTENT,`First Content should be with role 'user', got ${s}`);if(!rt.includes(s))throw new u(d.INVALID_CONTENT,`Each item should include role field. Got ${s} but valid roles are: ${JSON.stringify(rt)}`);if(!Array.isArray(r))throw new u(d.INVALID_CONTENT,"Content should have 'parts' property with an array of Parts");if(r.length===0)throw new u(d.INVALID_CONTENT,"Each Content should have at least one part");const o={text:0,inlineData:0,functionCall:0,functionResponse:0,thought:0,thoughtSignature:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const a of r){if(a.type)o[a.type]+=1;else for(const c of["text","inlineData","functionCall","functionResponse","fileData","executableCode","codeExecutionResult"])c in a&&(o[c]+=1);"thought"in a&&a.thought&&(o.thought+=1),"thoughtSignature"in a&&a.thoughtSignature&&(o.thoughtSignature+=1)}const i=br[s];for(const a of yr)if(!i.includes(a)&&o[a]>0)throw new u(d.INVALID_CONTENT,`Content with role '${s}' can't contain '${a}' part`);if(e&&!lt[s].includes(e.role))throw new u(d.INVALID_CONTENT,`Content with role '${s}' can't follow '${e.role}'. Valid previous roles: ${JSON.stringify(lt)}`);e=n}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wr extends gr{constructor(e,n,s,r,o){var i;super(e,r,o),this.model=n,this.chromeAdapter=s,this.params=r,this.requestOptions=o,r!=null&&r.history&&(Er(r.history),this._history=F(r.history)),((i=this.params)==null?void 0:i.systemInstruction)!=null&&(this.params={...this.params,systemInstruction:Fe(this.params.systemInstruction)})}_formatRequest(e,n){var s,r,o,i,a;return{safetySettings:(s=this.params)==null?void 0:s.safetySettings,generationConfig:(r=this.params)==null?void 0:r.generationConfig,tools:(o=this.params)==null?void 0:o.tools,toolConfig:(i=this.params)==null?void 0:i.toolConfig,systemInstruction:(a=this.params)==null?void 0:a.systemInstruction,contents:[...this._history,...n,e]}}_callGenerateContent(e,n){return jt(this._apiSettings,this.model,e,this.chromeAdapter,{...this.requestOptions,...n})}_callGenerateContentStream(e,n){return Ht(this._apiSettings,this.model,e,this.chromeAdapter,{...this.requestOptions,...n})}async sendMessage(e,n){return this._sendMessage(e,n)}async sendMessageStream(e,n){return this._sendMessageStream(e,n)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _r(t,e,n,s){n=nr(n);let r="";if(t.backend.backendType===M.GOOGLE_AI){const i=sr(n,e);r=JSON.stringify(i)}else r=JSON.stringify(n);return(await Be({model:e,task:"countTokens",apiSettings:t,stream:!1,singleRequestOptions:s},r)).json()}async function Or(t,e,n,s,r){if((s==null?void 0:s.mode)===_.ONLY_ON_DEVICE)throw new u(d.UNSUPPORTED,"countTokens() is not supported for on-device models.");return _r(t,e,n,r)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir extends q{constructor(e,n,s,r){super(e,n.model),this.chromeAdapter=r,this.generationConfig=n.generationConfig||{},Sr(this.generationConfig),this.safetySettings=n.safetySettings||[],this.tools=n.tools,this.toolConfig=n.toolConfig,this.systemInstruction=Fe(n.systemInstruction),this.requestOptions=s||{}}async initializeDeviceModel(e){if(!this.chromeAdapter||this.chromeAdapter.mode===_.ONLY_IN_CLOUD)return;if(await this.chromeAdapter.downloadIfAvailable(e)===D.UNAVAILABLE){const s=new u(d.API_NOT_ENABLED,"Local LanguageModel API not available in this environment.");if(this.chromeAdapter.mode===_.ONLY_ON_DEVICE)throw s;E.debug(s.message)}await this.chromeAdapter.downloadPromise}async generateContent(e,n){const s=be(e);return jt(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...s},this.chromeAdapter,{...this.requestOptions,...n})}async generateContentStream(e,n){const s=be(e),{stream:r,response:o}=await Ht(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...s},this.chromeAdapter,{...this.requestOptions,...n});return{stream:r,response:o}}startChat(e){return new wr(this._apiSettings,this.model,this.chromeAdapter,{tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,generationConfig:this.generationConfig,safetySettings:this.safetySettings,...e},this.requestOptions)}async countTokens(e,n){const s=be(e);return Or(this._apiSettings,this.model,s,this.chromeAdapter,{...this.requestOptions,...n})}}function Sr(t){var e,n;if(((e=t.thinkingConfig)==null?void 0:e.thinkingBudget)!=null&&((n=t.thinkingConfig)!=null&&n.thinkingLevel))throw new u(d.UNSUPPORTED,"Cannot set both thinkingBudget and thinkingLevel in a config.");if(t.responseSchema!=null&&t.responseJsonSchema!=null)throw new u(d.UNSUPPORTED,"Cannot set both responseSchema and responseJsonSchema in a config.");if((t.responseSchema!=null||t.responseJsonSchema!=null)&&t.responseMimeType!=="application/json"&&t.responseMimeType!=="text/x.enum")throw new u(d.UNSUPPORTED,'responseMimeType must be set to "application/json" or "text/x.enum" if responseSchema or responseJsonSchema are set.')}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w{constructor(e){if(!e.type&&!e.anyOf)throw new u(d.INVALID_SCHEMA,"A schema must have either a 'type' or an 'anyOf' array of sub-schemas.");for(const n in e)this[n]=e[n];this.type=e.type,this.format=e.hasOwnProperty("format")?e.format:void 0,this.nullable=e.hasOwnProperty("nullable")?!!e.nullable:!1}toJSON(){const e={type:this.type};for(const n in this)this.hasOwnProperty(n)&&this[n]!==void 0&&(n!=="required"||this.type===H.OBJECT)&&(e[n]=this[n]);return e}static array(e){return new vr(e,e.items)}static object(e){return new Rr(e,e.properties,e.optionalProperties)}static string(e){return new dt(e)}static enumString(e){return new dt(e,e.enum)}static integer(e){return new Tr(e)}static number(e){return new Ar(e)}static boolean(e){return new Cr(e)}static anyOf(e){return new Dr(e)}}class Tr extends w{constructor(e){super({type:H.INTEGER,...e})}}class Ar extends w{constructor(e){super({type:H.NUMBER,...e})}}class Cr extends w{constructor(e){super({type:H.BOOLEAN,...e})}}class dt extends w{constructor(e,n){super({type:H.STRING,...e}),this.enum=n}toJSON(){const e=super.toJSON();return this.enum&&(e.enum=this.enum),e}}class vr extends w{constructor(e,n){super({type:H.ARRAY,...e}),this.items=n}toJSON(){const e=super.toJSON();return e.items=this.items.toJSON(),e}}class Rr extends w{constructor(e,n,s=[]){super({type:H.OBJECT,...e}),this.properties=n,this.optionalProperties=s}toJSON(){const e=super.toJSON();e.properties={...this.properties};const n=[];if(this.optionalProperties){for(const s of this.optionalProperties)if(!this.properties.hasOwnProperty(s))throw new u(d.INVALID_SCHEMA,`Property "${s}" specified in "optionalProperties" does not exist.`)}for(const s in this.properties)this.properties.hasOwnProperty(s)&&(e.properties[s]=this.properties[s].toJSON(),this.optionalProperties.includes(s)||n.push(s));return n.length>0&&(e.required=n),delete e.optionalProperties,e}}class Dr extends w{constructor(e){if(e.anyOf.length===0)throw new u(d.INVALID_SCHEMA,"The 'anyOf' array must not be empty.");super({...e,type:void 0}),this.anyOf=e.anyOf}toJSON(){const e=super.toJSON();return this.anyOf&&Array.isArray(this.anyOf)&&(e.anyOf=this.anyOf.map(n=>n.toJSON())),e}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kr(t=Rt(),e){t=St(t);const n=Ct(t,W),s=(e==null?void 0:e.backend)??new le,r=Gs(s),o=n.getImmediate({identifier:r}),i=o.options;if(i){const a=e==null?void 0:e.useLimitedUseAppCheckTokens,c=!!i.useLimitedUseAppCheckTokens;if(a!=null&&!!a!==c)throw new u(d.ALREADY_INITIALIZED,`getAI() has already been called for app "${t.name}" and this backend with useLimitedUseAppCheckTokens: ${c}. This option cannot be changed after the AI instance has been initialized. Pass the desired options to the first getAI() call for this app and backend, or omit useLimitedUseAppCheckTokens to reuse the existing instance.`);return o}return o.options={useLimitedUseAppCheckTokens:(e==null?void 0:e.useLimitedUseAppCheckTokens)??!1},o}const Nr=["mode","onDeviceParams","inCloudParams"];function Mr(t,e,n){var a;const s=e;let r;if(s.mode){for(const c of Object.keys(e))Nr.includes(c)||E.warn(`When a hybrid inference mode is specified (mode is currently set to ${s.mode}), "${c}" cannot be configured at the top level. Configuration for in-cloud and on-device must be done separately in inCloudParams and onDeviceParams. Configuration values set outside of inCloudParams and onDeviceParams will be ignored.`);r=s.inCloudParams||{model:Us}}else r=e;if(!r.model)throw new u(d.NO_MODEL,"Must provide a model name. Example: getGenerativeModel({ model: 'my-model-name' })");const o=(a=t.chromeAdapterFactory)==null?void 0:a.call(t,s.mode,typeof window>"u"?void 0:window,s.onDeviceParams),i=new Ir(t,r,n,o);return i._apiSettings.inferenceMode=s.mode,i}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pr(){z(new G(W,zs,"PUBLIC").setMultipleInstances(!0)),U(nt,Ce),U(nt,Ce,"esm2020")}Pr();/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ve=new Map,Vt={activated:!1,tokenObservers:[]},Lr={initialized:!1,enabled:!1};function T(t){return ve.get(t)||{...Vt}}function $r(t,e){return ve.set(t,e),ve.get(t)}function de(){return Lr}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xr="https://content-firebaseappcheck.googleapis.com/v1",Br="exchangeDebugToken",ut={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:960*1e3};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fr{constructor(e,n,s,r,o){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=s,this.lowerBound=r,this.upperBound=o,this.pending=null,this.nextErrorWaitInterval=r,r>o)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new oe,this.pending.promise.catch(n=>{}),await Ur(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new oe,this.pending.promise.catch(n=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(n){this.retryPolicy(n)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n}}}function Ur(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gr={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},v=new Le("appCheck","AppCheck",Gr);function zt(t){if(!T(t).activated)throw v.create("use-before-activation",{appName:t.name})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wt({url:t,body:e},n){const s={"Content-Type":"application/json"},r=n.getImmediate({optional:!0});if(r){const h=await r.getHeartbeatsHeader();h&&(s["X-Firebase-Client"]=h)}const o={method:"POST",body:JSON.stringify(e),headers:s};let i;try{i=await fetch(t,o)}catch(h){throw v.create("fetch-network-error",{originalErrorMessage:h==null?void 0:h.message})}if(i.status!==200)throw v.create("fetch-status-error",{httpStatus:i.status});let a;try{a=await i.json()}catch(h){throw v.create("fetch-parse-error",{originalErrorMessage:h==null?void 0:h.message})}const c=a.ttl.match(/^([\d.]+)(s)$/);if(!c||!c[2]||isNaN(Number(c[1])))throw v.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${a.ttl}`});const l=Number(c[1])*1e3,g=Date.now();return{token:a.token,expireTimeMillis:g+l,issuedAtTimeMillis:g}}function Jt(t,e){const{projectId:n,appId:s,apiKey:r}=t.options;return{url:`${xr}/projects/${n}/apps/${s}:${Br}?key=${r}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hr="firebase-app-check-database",jr=1,Z="firebase-app-check-store",Kt="debug-token";let te=null;function qt(){return te||(te=new Promise((t,e)=>{try{const n=indexedDB.open(Hr,jr);n.onsuccess=s=>{t(s.target.result)},n.onerror=s=>{var r;e(v.create("storage-open",{originalErrorMessage:(r=s.target.error)==null?void 0:r.message}))},n.onupgradeneeded=s=>{const r=s.target.result;switch(s.oldVersion){case 0:r.createObjectStore(Z,{keyPath:"compositeKey"})}}}catch(n){e(v.create("storage-open",{originalErrorMessage:n==null?void 0:n.message}))}}),te)}function Vr(t){return Xt(Zt(t))}function zr(t,e){return Yt(Zt(t),e)}function Wr(t){return Yt(Kt,t)}function Jr(){return Xt(Kt)}async function Yt(t,e){const s=(await qt()).transaction(Z,"readwrite"),o=s.objectStore(Z).put({compositeKey:t,value:e});return new Promise((i,a)=>{o.onsuccess=c=>{i()},s.onerror=c=>{var l;a(v.create("storage-set",{originalErrorMessage:(l=c.target.error)==null?void 0:l.message}))}})}async function Xt(t){const n=(await qt()).transaction(Z,"readonly"),r=n.objectStore(Z).get(t);return new Promise((o,i)=>{r.onsuccess=a=>{const c=a.target.result;o(c?c.value:void 0)},n.onerror=a=>{var c;i(v.create("storage-get",{originalErrorMessage:(c=a.target.error)==null?void 0:c.message}))}})}function Zt(t){return`${t.options.appId}-${t.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L=new $e("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kr(t){if(Pe()){let e;try{e=await Vr(t)}catch(n){L.warn(`Failed to read token from IndexedDB. Error: ${n}`)}return e}}function Ee(t,e){return Pe()?zr(t,e).catch(n=>{L.warn(`Failed to write token to IndexedDB. Error: ${n}`)}):Promise.resolve()}async function qr(t){let e;try{e=await Jr()}catch{}if(e)return e;{const n=crypto.randomUUID();let s=`To use this token for app debugging, register it with your project.

Firebase App Check debug token: ${n}

`;const r=t==null?void 0:t.options.appId,o=t==null?void 0:t.options.projectId;return o&&r?s+=`You can do so in the Firebase Console:
https://console.firebase.google.com/project/${o}/appcheck/apps?selectedAppId=${r}

Or using the Firebase CLI:
firebase appcheck:debugtokens:create ${n} --project ${o} --app ${r}

`:s+=`You will need to add it to your app's App Check settings in the Firebase Console for it to work.

`,s+=`Note: To keep your project secure, please revoke and delete this token using the
Firebase Console or the CLI (\`firebase appcheck:debugtokens:delete\`) when you finish debugging.

Warning: This debug token is a secret and should not be shared or uploaded to source code.

Debug Token Guide: https://firebase.google.com/docs/app-check/web/debug-provider
Firebase CLI install instructions: https://firebase.google.com/docs/cli
`,console.log(s),Wr(n).catch(i=>L.warn(`Failed to persist debug token to IndexedDB. Error: ${i}`)),n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function je(){return de().enabled}async function Ve(){const t=de();if(t.enabled&&t.token)return t.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function Yr(t){const e=Me(),n=de();if(n.initialized=!0,typeof e.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&e.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;n.enabled=!0;const s=new oe;n.token=s,typeof e.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?s.resolve(e.FIREBASE_APPCHECK_DEBUG_TOKEN):s.resolve(qr(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xr={error:"UNKNOWN_ERROR"};function Zr(t){return Ne.encodeString(JSON.stringify(t),!1)}async function Re(t,e=!1,n=!1){const s=t.app;zt(s);const r=T(s);let o=r.token,i;if(o&&!V(o)&&(r.token=void 0,o=void 0),!o){const l=await r.cachedTokenPromise;l&&(V(l)?o=l:await Ee(s,void 0))}if(!e&&o&&V(o))return{token:o.token};let a=!1;if(je())try{const l=await Ve();r.exchangeTokenPromise||(r.exchangeTokenPromise=Wt(Jt(s,l),t.heartbeatServiceProvider).finally(()=>{r.exchangeTokenPromise=void 0}),a=!0);const g=await r.exchangeTokenPromise;return await Ee(s,g),r.token=g,{token:g.token}}catch(l){return l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?L.warn(l.message):n&&L.error(l),we(l)}try{r.exchangeTokenPromise||(r.exchangeTokenPromise=r.provider.getToken().finally(()=>{r.exchangeTokenPromise=void 0}),a=!0),o=await T(s).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?L.warn(l.message):n&&L.error(l),i=l}let c;return o?i?V(o)?c={token:o.token,internalError:i}:c=we(i):(c={token:o.token},r.token=o,await Ee(s,o)):c=we(i),a&&tn(s,c),c}async function Qr(t){const e=t.app;zt(e);const{provider:n}=T(e);if(je()){const s=await Ve(),r=Jt(e,s);r.body.limited_use=!0;const{token:o}=await Wt(r,t.heartbeatServiceProvider);return{token:o}}else{const{token:s}=await n.getToken(!0);return{token:s}}}function Qt(t,e,n,s){const{app:r}=t,o=T(r),i={next:n,error:s,type:e};if(o.tokenObservers=[...o.tokenObservers,i],o.token&&V(o.token)){const a=o.token;Promise.resolve().then(()=>{n({token:a.token}),ht(t)}).catch(()=>{})}o.cachedTokenPromise.then(()=>ht(t))}function en(t,e){const n=T(t),s=n.tokenObservers.filter(r=>r.next!==e);s.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=s}function ht(t){const{app:e}=t,n=T(e);let s=n.tokenRefresher;s||(s=eo(t),n.tokenRefresher=s),!s.isRunning()&&n.isTokenAutoRefreshEnabled&&s.start()}function eo(t){const{app:e}=t;return new Fr(async()=>{const n=T(e);let s;if(n.token?s=await Re(t,!0):s=await Re(t),s.error)throw s.error;if(s.internalError)throw s.internalError},()=>!0,()=>{const n=T(e);if(n.token){let s=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+3e5;const r=n.token.expireTimeMillis-300*1e3;return s=Math.min(s,r),Math.max(0,s-Date.now())}else return 0},ut.RETRIAL_MIN_WAIT,ut.RETRIAL_MAX_WAIT)}function tn(t,e){const n=T(t).tokenObservers;for(const s of n)try{s.type==="EXTERNAL"&&e.error!=null?s.error(e.error):s.next(e)}catch{}}function V(t){return t.expireTimeMillis-Date.now()>0}function we(t){return{token:Zr(Xr),error:t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class to{constructor(e,n){this.app=e,this.heartbeatServiceProvider=n}_delete(){const{tokenObservers:e}=T(this.app);for(const n of e)en(this.app,n.next);return Promise.resolve()}}function no(t,e){return new to(t,e)}function so(t){return{getToken:e=>Re(t,e),getLimitedUseToken:()=>Qr(t),addTokenListener:e=>Qt(t,"INTERNAL",e),removeTokenListener:e=>en(t.app,e)}}const ro="@firebase/app-check",oo="0.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function io(t=Rt(),e){var r;t=St(t);const n=Ct(t,"app-check");if(de().initialized||Yr(t),je()&&Ve().then(o=>{console.log(`Firebase App Check debug token: ${o}`)}),n.isInitialized()){const o=n.getImmediate(),i=n.getOptions();if(i&&!!i.isTokenAutoRefreshEnabled==!!e.isTokenAutoRefreshEnabled&&((r=i.provider)!=null&&r.isEqual(e.provider)))return o;throw v.create("already-initialized",{appName:t.name})}const s=n.initialize({options:e});return ao(t,e.provider,e.isTokenAutoRefreshEnabled),T(t).isTokenAutoRefreshEnabled&&Qt(s,"INTERNAL",()=>{}),s}function ao(t,e,n=!1){const s=$r(t,{...Vt});s.activated=!0,s.provider=e,s.cachedTokenPromise=Kr(t).then(r=>(r&&V(r)&&(s.token=r,tn(t,{token:r.token})),r)),s.isTokenAutoRefreshEnabled=n&&t.automaticDataCollectionEnabled,!t.automaticDataCollectionEnabled&&n&&L.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),s.provider.initialize(t)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const co="app-check",ft="app-check-internal";function lo(){z(new G(co,t=>{const e=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat");return no(e,n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,n)=>{t.getProvider(ft).initialize()})),z(new G(ft,t=>{const e=t.getProvider("app-check").getImmediate();return so(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),U(ro,oo)}lo();const se={apiKey:"AIzaSyCkleH4UNWTBRwRb6zKLwpleK205HCtCxI",authDomain:"briefly-aa68d.firebaseapp.com",projectId:"briefly-aa68d",storageBucket:"briefly-aa68d.firebasestorage.app",messagingSenderId:"387585752591",appId:"1:387585752591:web:e0767723bc09469e9cad7a"};function nn(){return typeof se.apiKey=="string"&&se.apiKey.length>0&&!se.apiKey.startsWith("YOUR_")}const re=600,uo="gemini-3-flash-preview",ho={type:"object",properties:{title:{type:"string"},summary:{type:"array",items:{type:"string"}},actionItems:{type:"array",items:{type:"object",properties:{task:{type:"string"},owner:{type:"string"},due:{type:"string"}},required:["task"]}},keyDates:{type:"array",items:{type:"string"}}},required:["title","summary","actionItems"]};function fo(){return w.object({properties:{title:w.string(),summary:w.array({items:w.string()}),actionItems:w.array({items:w.object({properties:{task:w.string(),owner:w.string(),due:w.string()},optionalProperties:["owner","due"]})}),keyDates:w.array({items:w.string()})},optionalProperties:["keyDates"]})}function sn(t){return(t||"").trim().split(/\s+/).filter(Boolean).length}const po=`Turn the messy notes below into a structured brief.
Return ONLY a JSON object matching this schema — no markdown fences, no extra text:
{
  "title": "short descriptive title",
  "summary": ["3-5 concise bullet points capturing the key points"],
  "actionItems": [{"task": "...", "owner": "person or empty string", "due": "date or empty string"}],
  "keyDates": ["any important dates mentioned, as written in the notes"]
}
Rules: summary must have 3-5 items. actionItems: extract every task, owner and
deadline you can find; use "" when owner or due is not stated. keyDates may be
empty. Do not invent facts that are not in the notes.

NOTES:
"""__NOTES__"""`;let ne=null,rn=null,mo=!1;const C={sdkLoaded:!0,modelCreated:!1,initializeDeviceModelIsFunction:!1,lastInferenceSource:null,lastError:null};typeof window<"u"&&(window.__brieflyDebug=C);function go(){if(!ne){ne=vt(se);try{self.FIREBASE_APPCHECK_DEBUG_TOKEN=!0,io(ne,{isTokenAutoRefreshEnabled:!0}),mo=!0}catch(t){console.warn("[Briefly] App Check init skipped:",t)}rn=kr(ne,{backend:new le})}}function yo(t,e){return t==="on-device"?_.ONLY_ON_DEVICE:t==="cloud"?_.PREFER_IN_CLOUD:e<=re?_.PREFER_ON_DEVICE:_.PREFER_IN_CLOUD}function on(t,e){go();const n=yo(t,e),s=Mr(rn,{mode:n,inCloudParams:{model:uo,generationConfig:{responseMimeType:"application/json",responseSchema:fo()}},onDeviceParams:{promptOptions:{responseConstraint:ho}}});return C.modelCreated=!0,C.initializeDeviceModelIsFunction=typeof s.initializeDeviceModel=="function",{model:s,mode:n}}async function bo(){try{const t=globalThis.LanguageModel;if(typeof t>"u")return{available:!1,detail:"Prompt API not present in this browser (needs Chrome Desktop 139+ with the Gemini Nano flag enabled)."};if(typeof t.availability=="function"){const e=await t.availability();return e==="available"?{available:!0,detail:"Gemini Nano is ready on this device."}:e==="downloadable"||e==="downloading"?{available:!1,detail:`Gemini Nano model is ${e} — it will download on first use.`}:{available:!1,detail:`Gemini Nano reports status "${e}" in this browser.`}}return{available:!1,detail:"Prompt API found but availability() is not exposed."}}catch(t){return{available:!1,detail:`On-device check failed: ${(t==null?void 0:t.message)||t}`}}}function Eo(t){const e=String(t||"").trim().replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,""),n=JSON.parse(e);if(!n||typeof n!="object")throw new Error("Model did not return an object.");return{title:typeof n.title=="string"?n.title:"Untitled brief",summary:Array.isArray(n.summary)?n.summary.filter(s=>typeof s=="string"):[],actionItems:Array.isArray(n.actionItems)?n.actionItems.filter(s=>s&&typeof s.task=="string").map(s=>({task:s.task,owner:typeof s.owner=="string"?s.owner:"",due:typeof s.due=="string"?s.due:""})):[],keyDates:Array.isArray(n.keyDates)?n.keyDates.filter(s=>typeof s=="string"):[]}}function pt(t,e){const n=String((t==null?void 0:t.message)||t||"Unknown error"),s=n.match(/\[\d{3}[^\]]*\]/),r=s?` Server response: ${s[0]}.`:"";return/api key|api-key|API_KEY|401|403|permission/i.test(n)?"Firebase rejected the request (bad or missing API key / project not enabled for AI Logic). Check your Firebase config and that AI Logic is enabled for the Gemini Developer API.":/on-device|device model|download|not available|unavailable/i.test(n)?e==="on-device"?"On-device model is not available in this browser (needs Chrome Desktop 139+ with Gemini Nano enabled). Try Auto or Cloud mode.":"On-device model could not start; the cloud path will be tried automatically in Auto mode.":/network|fetch|failed to fetch|offline/i.test(n)?`Network error while calling Firebase AI Logic. Check your connection and try again.${r}`:`Brief generation failed: ${n}${r}`}async function wo(t,e,n){const s=performance.now(),r=sn(t);if(C.lastError=null,!nn())throw new Error("SETUP_REQUIRED: Firebase is not configured yet. Follow the setup guide below to add your Firebase project config, then reload.");const{model:o,mode:i}=on(e,r);if(i===_.ONLY_ON_DEVICE||i===_.PREFER_ON_DEVICE){n==null||n("Preparing on-device model…",void 0);try{await o.initializeDeviceModel(p=>{n==null||n("Downloading on-device model…",Math.round(p*100))})}catch(p){if(i===_.ONLY_ON_DEVICE)throw C.lastError=String((p==null?void 0:p.message)||p),new Error(pt(p,e));console.warn("[Briefly] initializeDeviceModel failed, falling back to cloud:",p)}}n==null||n("Generating brief…",void 0);let c;try{c=await o.generateContent(po.replace("__NOTES__",t))}catch(p){throw C.lastError=String((p==null?void 0:p.message)||p),new Error(pt(p,e))}const l=c.response.text(),g=c.response.inferenceSource||"unknown";C.lastInferenceSource=g;let h;try{h=Eo(l)}catch(p){throw C.lastError=`JSON parse failed: ${p==null?void 0:p.message}`,new Error("The model returned a response that could not be parsed as a brief. Please try again.")}return{brief:h,source:g,latencyMs:Math.round(performance.now()-s),wordCount:r,mode:String(i)}}const _o=/\b(todo|action|follow[- ]?up|assign|deadline|due|by\s+\w+day|please|need to|must|should|will)\b/i,an=/\b(?:\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{2,4}|\d{1,2}\/\d{1,2}\/\d{2,4}|\d{4}-\d{2}-\d{2}|(?:next\s+)?(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)|tomorrow|today|end of (?:week|month|quarter)|Q[1-4]\s*\d{2,4}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2}(?:st|nd|rd|th)?(?:,?\s+\d{4})?)\b/gi;function Oo(t){return String(t||"").replace(/\r\n?/g,`
`).split(new RegExp("(?<=[.!?])\\s+|\\n+")).map(e=>e.replace(/^[-*•\d.)\s]+/,"").trim()).filter(e=>e.length>3)}const Io=new Set(["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Sept","Oct","Nov","Dec","January","February","March","April","June","July","August","September","October","November","December","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Mon","Tue","Wed","Thu","Fri","Sat","Sun","We","The","This","That","Next","Team"]);function So(t){const e=t.match(/\bby\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/)||t.match(/@([A-Za-z][\w.]+)/)||t.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s*[:–-]\s/)||t.match(/\b([A-Z][a-z]+)\s+(?:to|will|should|must)\b/);if(!e)return"";const n=e[1].replace(/^@/,"");return Io.has(n.split(" ")[0])?"":n}function To(t){const e=t.match(an);return e?e[0]:""}function Ao(t,e){let n=10-Math.min(e,8);return/\d/.test(t)&&(n+=3),/\b(decided|agreed|launch|deadline|budget|release|launch|important|key|main)\b/i.test(t)&&(n+=3),/\b(we|team|project|client|customer)\b/i.test(t)&&(n+=1),n}async function Co(t,e,n){const s=performance.now(),r=(t||"").trim().split(/\s+/).filter(Boolean).length;n==null||n("Simulating on-device inference…",void 0),await new Promise(f=>setTimeout(f,350)),n==null||n("Simulating brief generation…",void 0),await new Promise(f=>setTimeout(f,350));const o=Oo(t),i=String(t||"").split(`
`).map(f=>f.trim()).filter(Boolean);let a=o[0]||"Untitled notes";a=a.replace(/\.$/,""),a.length>72&&(a=a.slice(0,69).trimEnd()+"…"),a=a.charAt(0).toUpperCase()+a.slice(1);const c=o.map((f,I)=>({s:f,i:I,score:Ao(f,I)})).sort((f,I)=>I.score-f.score).slice(0,5).sort((f,I)=>f.i-I.i).map(f=>f.s),l=c.slice(0,Math.max(3,Math.min(5,c.length)));l.length===0&&l.push("No clear points could be extracted from these notes.");const g=[];for(const f of[...i,...o]){if(g.length>=8)break;if(!_o.test(f))continue;const I=f.replace(/^(todo|action)[:\s-]*/i,"").replace(/\s+/g," ").trim();I.length<4||g.some(Q=>Q.task.toLowerCase()===I.toLowerCase())||g.push({task:I.length>140?I.slice(0,137).trimEnd()+"…":I,owner:So(f),due:To(f)})}const h=[];for(const f of String(t||"").matchAll(an))if(h.includes(f[0])||h.push(f[0]),h.length>=8)break;const y=e==="on-device"||e==="auto"&&r<=600?"on_device":"in_cloud";return{brief:{title:a,summary:l,actionItems:g,keyDates:h},source:y,latencyMs:Math.round(performance.now()-s),wordCount:r,simulated:!0}}const m=t=>document.querySelector(t),vo=new URLSearchParams(location.search),cn=vo.get("demo")==="1",ze="briefly.history.v1",Ro=10,Do=`Team sync — Nov 20, 2026
We agreed to launch the new onboarding flow on Dec 2. Sarah will finish the empty-state illustrations by Nov 25, and Budi will wire up the analytics events before the launch. TODO: Priya to confirm the pricing page copy with Legal by Friday. We also decided to pause the referral program until January because the fraud checks are not ready yet. Next sync is Monday, Nov 24 at 10:00.`,ko=`Lecture notes — Introduction to Distributed Systems (week 9)
Today the professor covered consensus and why it is hard. The main idea: in an asynchronous network with crash failures, you cannot guarantee both safety and liveness at the same time — that is the FLP impossibility result from 1985. Paxos was presented as the classic solution; Raft was introduced as the more understandable alternative that most real systems use today. The professor stressed that Raft elects a leader, replicates a log, and only commits an entry once a majority has stored it. We worked through an example where a leader crashes mid-replication and a new election starts; the key point was that the new leader must have the most up-to-date log or data can be lost. TODO: read the Raft paper (Ongaro & Ousterhout 2014) before Thursday's tutorial. The assignment is due Dec 12: implement a simplified Raft node in Go that handles leader election and log replication, with tests covering a crashed leader and a partitioned network. The professor also mentioned that the midterm is on Dec 5 and will cover chapters 4 to 7, with a focus on vector clocks and causal ordering. There was a question about the CAP theorem: the professor said to think of it as a spectrum, not a binary choice, and that most systems choose availability with eventual consistency. A student asked whether blockchain counts as a consensus protocol; the answer was yes, Nakamoto consensus is a probabilistic form of consensus that trades finality for openness. TODO: form study groups of three by Friday Nov 28 and post the group list on the course forum. Office hours move to Wednesday 14:00 from next week. The final exam is scheduled for Jan 20, 2027, and the project demo day is Jan 13. Remember to bring the lab report to the next session, and the teaching assistant will collect the homework on Monday.

The second half of the lecture moved to failure detection and membership. The professor explained that in a large cluster you cannot rely on a single coordinator to notice crashes, so systems use gossip protocols: every node periodically exchanges state with a few random peers, and information about a failed node spreads through the cluster in logarithmic time. We compared this with heartbeat-based detection, which is simpler but creates a bottleneck at the monitor. A student asked how long to wait before declaring a node dead; the professor said there is no perfect timeout, only a trade-off between false positives and slow detection, and that most systems use an adaptive timeout based on observed network delays. TODO: implement a simple gossip-based failure detector as an optional bonus in the assignment, due with the main submission on Dec 12. The professor then covered two-phase commit: the coordinator asks all participants to prepare, waits for yes votes, and then sends commit or abort. The key weakness is blocking — if the coordinator crashes after the prepare phase, participants are stuck holding locks until it recovers. Three-phase commit adds a pre-commit round to avoid blocking in some cases, but it still cannot survive network partitions, which is why modern systems prefer Paxos or Raft. The last topic was vector clocks: each node keeps a counter per node, stamps every event, and two events are concurrent when neither vector dominates the other. The professor gave an example with three nodes exchanging messages and asked us to compute the clock values on the whiteboard; most of the class got it right on the second try. TODO: solve the vector clock exercise in chapter 6 before the tutorial on Thursday. The reading list for next week is chapters 8 and 9, plus the Dynamo paper, and the professor reminded everyone that the lab machines will be down for maintenance on Saturday Dec 6 from 08:00 to 12:00. Bring your laptop to the lab session on Dec 8 because we will run the Raft demo on the cluster.`;function S(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function mt(t){const e=m("#errorBox");e.innerHTML=`<strong>Something went wrong.</strong><br>${S(t)}`,e.hidden=!1}function Y(){const t=m("#errorBox");t.hidden=!0,t.textContent=""}function gt(t,e){const n=m("#progressBar"),s=m("#progressLabel");if(!t){n.hidden=!0,s.textContent="";return}n.hidden=!1,s.textContent=t;const r=m("#progressFill");typeof e=="number"?(r.style.width=`${Math.max(0,Math.min(100,e))}%`,s.textContent=`${t} (${e}%)`):(r.style.width="100%",r.classList.add("indeterminate"))}function No(){const t=m("#progressBar");t.hidden=!0,m("#progressLabel").textContent="",m("#progressFill").style.width="0%",m("#progressFill").classList.remove("indeterminate")}function yt(t){m("#generateBtn").disabled=t,m("#notes").disabled=t}function ln(t,e){return e?t==="on_device"?"Simulated · On-device (demo)":"Simulated · Cloud (demo)":t==="on_device"?"On-device · Gemini Nano":t==="in_cloud"?"Cloud · Gemini":`Inference: ${t}`}function dn(t){const{brief:e,source:n,latencyMs:s,wordCount:r,simulated:o}=t,i=ln(n,o),a=n==="on_device"?"badge-device":"badge-cloud",c=m("#result");c.hidden=!1,c.innerHTML=`
    <div class="result-head">
      <span class="source-badge ${a}">${S(i)}</span>
      <span class="meta">${S(String(s))} ms · ${S(String(r))} words${o?" · demo":""}</span>
    </div>
    <h2 class="brief-title">${S(e.title)}</h2>
    <h3>Summary</h3>
    <ul class="summary-list">
      ${e.summary.map(l=>`<li>${S(l)}</li>`).join("")||"<li>No summary points.</li>"}
    </ul>
    <h3>Action items</h3>
    ${e.actionItems.length?`<table class="actions-table">
            <thead><tr><th>Task</th><th>Owner</th><th>Due</th></tr></thead>
            <tbody>
              ${e.actionItems.map(l=>`<tr><td>${S(l.task)}</td><td>${S(l.owner||"—")}</td><td>${S(l.due||"—")}</td></tr>`).join("")}
            </tbody>
          </table>`:'<p class="muted">No action items found in these notes.</p>'}
    <h3>Key dates</h3>
    ${e.keyDates.length?`<ul class="dates-list">${e.keyDates.map(l=>`<li>${S(l)}</li>`).join("")}</ul>`:'<p class="muted">No key dates mentioned.</p>'}
    <div class="result-actions">
      <button id="copyMdBtn" type="button">Copy Markdown</button>
      <button id="copyJsonBtn" type="button">Copy JSON</button>
    </div>
    <details class="raw-json">
      <summary>Raw JSON</summary>
      <pre>${S(JSON.stringify(e,null,2))}</pre>
    </details>
  `,m("#copyMdBtn").addEventListener("click",()=>bt(Mo(e))),m("#copyJsonBtn").addEventListener("click",()=>bt(JSON.stringify(e,null,2))),c.scrollIntoView({behavior:"smooth",block:"start"})}function Mo(t){const e=[`# ${t.title}`,"","## Summary",""];for(const n of t.summary)e.push(`- ${n}`);if(e.push("","## Action items",""),t.actionItems.length){e.push("| Task | Owner | Due |","| --- | --- | --- |");for(const n of t.actionItems)e.push(`| ${n.task} | ${n.owner||"—"} | ${n.due||"—"} |`)}else e.push("None.");if(e.push("","## Key dates",""),t.keyDates.length)for(const n of t.keyDates)e.push(`- ${n}`);else e.push("None.");return e.join(`
`)}async function bt(t){try{await navigator.clipboard.writeText(t);const e=m("#copyStatus");e.textContent="Copied to clipboard.",setTimeout(()=>e.textContent="",2e3)}catch{const e=m("#copyStatus");e.textContent="Copy failed — select the text manually."}}function De(){try{const t=JSON.parse(localStorage.getItem(ze)||"[]");return Array.isArray(t)?t:[]}catch{return[]}}function Po(t){const e=De();e.unshift(t),localStorage.setItem(ze,JSON.stringify(e.slice(0,Ro))),ke()}function ke(){const t=De(),e=m("#historyList"),n=m("#historyEmpty");if(!t.length){e.innerHTML="",n.hidden=!1;return}n.hidden=!0,e.innerHTML=t.map((s,r)=>`
      <li class="history-item">
        <button type="button" class="history-load" data-idx="${r}">
          <span class="history-title">${S(s.title)}</span>
          <span class="history-meta">${S(s.sourceLabel)} · ${S(String(s.wordCount))} words · ${S(s.when)}</span>
        </button>
      </li>`).join(""),e.querySelectorAll(".history-load").forEach(s=>{s.addEventListener("click",()=>{const r=De()[Number(s.dataset.idx)];r&&(m("#notes").value=r.notes,j(),dn({brief:r.brief,source:r.source,latencyMs:r.latencyMs,wordCount:r.wordCount,simulated:r.simulated}),Y())})})}function Et(){const t=m("#setupGuide");t.hidden=!1,t.scrollIntoView({behavior:"smooth",block:"start"})}async function Lo(){const t=m("#deviceBadge");t.textContent="Checking on-device…",t.className="device-badge checking";const e=await bo();e.available?(t.textContent="On-device: Available",t.className="device-badge available"):(t.textContent="On-device: Unavailable in this browser",t.className="device-badge unavailable"),t.title=e.detail,m("#deviceDetail").textContent=e.detail}function j(){const t=sn(m("#notes").value);m("#wordCount").textContent=`${t} word${t===1?"":"s"}`;const e=t<=re?`Auto routing: ≤ ${re} words → on-device`:`Auto routing: > ${re} words → cloud`;m("#routingHint").textContent=e}async function $o(){const t=m("#notes").value.trim();if(Y(),m("#setupGuide").hidden=!0,m("#result").hidden=!0,!t){mt("Paste some notes first — the textarea is empty.");return}const e=document.querySelector('input[name="mode"]:checked').value;yt(!0);try{let n;if(cn)n=await Co(t,e,gt);else if(nn())n=await wo(t,e,gt);else{Et();return}dn(n),Po({title:n.brief.title,brief:n.brief,notes:t,source:n.source,sourceLabel:ln(n.source,n.simulated),latencyMs:n.latencyMs,wordCount:n.wordCount,simulated:!!n.simulated,when:new Date().toLocaleString()})}catch(n){const s=String((n==null?void 0:n.message)||n);s.startsWith("SETUP_REQUIRED")?Et():mt(s)}finally{No(),yt(!1)}}function xo(){typeof window<"u"&&window.__brieflyDebug&&(window.__brieflyDebug.probeModel=(t,e)=>{try{return on(t||"auto",e||10),{ok:!0,...C}}catch(n){return{ok:!1,error:String((n==null?void 0:n.message)||n),...C}}}),cn&&(m("#demoBanner").hidden=!1,document.title="Briefly (Demo) — structured briefs from messy notes"),m("#notes").addEventListener("input",j),m("#generateBtn").addEventListener("click",$o),m("#loadShortBtn").addEventListener("click",()=>{m("#notes").value=Do,j(),Y()}),m("#loadLongBtn").addEventListener("click",()=>{m("#notes").value=ko,j(),Y()}),m("#clearBtn").addEventListener("click",()=>{m("#notes").value="",j(),m("#result").hidden=!0,Y()}),m("#clearHistoryBtn").addEventListener("click",()=>{localStorage.removeItem(ze),ke()}),j(),ke(),Lo()}document.addEventListener("DOMContentLoaded",xo);
