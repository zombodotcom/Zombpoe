import {
  app,
  BrowserWindow,
  autoUpdater,
  screen,
  Menu,
  MenuItem
} from "electron";
import * as path from "path";
import * as url from "url";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { Observable, range } from "rxjs";

interface RootObject {
  numTabs: number;
  tabs: Tab[];
  quadLayout: boolean;
  items: Item[];
}

interface Item {
  verified: boolean;
  w: number;
  h: number;
  ilvl: number;
  icon: string;
  league: string;
  id: string;
  name: string;
  typeLine: string;
  identified: boolean;
  note?: string;
  requirements?: Requirement[];
  implicitMods?: string[];
  explicitMods?: string[];
  frameType: number;
  x: number;
  y: number;
  inventoryId: string;
  elder?: boolean;
  flavourText?: string[];
  sockets?: Socket[];
  socketedItems?: any[];
  properties?: Property[];
  descrText?: string;
  support?: boolean;
  additionalProperties?: AdditionalProperty[];
  secDescrText?: string;
  veiledMods?: string[];
  veiled?: boolean;
  abyssJewel?: boolean;
  corrupted?: boolean;
  talismanTier?: number;
  utilityMods?: string[];
  craftedMods?: string[];
  shaper?: boolean;
  hybrid?: Hybrid;
}

interface Hybrid {
  isVaalGem: boolean;
  baseTypeName: string;
  properties: Requirement[];
  explicitMods: string[];
  secDescrText: string;
}

interface AdditionalProperty {
  name: string;
  values: (number | string)[][];
  displayMode: number;
  progress: number;
  type: number;
}

interface Property {
  name: string;
  values: (number | string)[][];
  displayMode: number;
  type?: number;
}

interface Socket {
  group: number;
  attr: string;
  sColour: string;
}

interface Requirement {
  name: string;
  values: (number | string)[][];
  displayMode: number;
}

interface Tab {
  n: string;
  i: number;
  id: string;
  type: string;
  hidden: boolean;
  selected: boolean;
  colour: Colour;
  srcL: string;
  srcC: string;
  srcR: string;
}

interface Colour {
  r: number;
  g: number;
  b: number;
}
// var menu = Menu.buildFromTemplate([
//   {
//     label: "Menu",
//     submenu: [
//       { label: "Adjust Notification Value" },
//       { label: "Zombpoe" },
//       {
//         label: "Exit",
//         click() {
//           app.quit();
//         }
//       }
//     ]
//   }
// ]);
// Menu.setApplicationMenu(menu);

// const { app, autoUpdater } = require("electron");
// const server = "hazel-i9aodbuhq.now.sh";
// const feed = `${server}/update/${process.platform}/${app.getVersion()}`;

const ipcMain = require("electron").ipcMain;
const { session } = require("electron");
let responsedata;
ipcMain.on("only-character-data", async (event, message) => {
  console.log("hello inside character data");
  let sessionid = message[0];
  let accountName = message[1];
  let league = message[2].split(" ").join("+");
  // event.sender.send("ping-async-stash", [
  //   "got poeninja data, starting stash",
  //   accountName,
  //   league
  // ]);

  let stashdatatemp2 = [];

  event.sender.send("ping-async-stash", [
    "backend poedata",
    [sessionid, accountName, league]
  ]);

  let stashurlsFull = [];

  event.sender.send("ping-async-stash", "starting stash");

  await axios
    .get(
      "https://www.pathofexile.com/character-window/get-stash-items?league=" +
        league +
        "&accountName=" +
        accountName +
        "&tabs=0&tabIndex=0",
      {
        headers: {
          cookie: "POESESSID=" + sessionid //the token is a variable which holds the token
        }
      }
    )
    .then(async response => {
      // var finalObj = finalObj.concat(response); // should concat the data
      console.log(response.headers);
      // message = response.data as RootObject;
      let stashdatatemp = [];
      this.stashdata = response.data;
      event.sender.send("ping-async-stash", [
        response,
        "got stash data" + "tab count " + Number(response.data.numTabs)
      ]);
      await sleep(10000);
      // get stash data
      let responseNumTabsTotal = response.data.numTabs;
      // event.returnValue = [
      //   ["Stash " + x],
      //   ["Left! total-index= " + (stashurlsFull.length - x)]
      // ];
      event.returnValue = ["hi"];
      // let numTabsResponse =
      for (let x = 0; x < 5; x++) {
        stashurlsFull.push(
          "https://www.pathofexile.com/character-window/get-stash-items?league=" +
            league +
            "&accountName=" +
            accountName +
            "&tabs=0&tabIndex=" +
            x
        );
      }
      let stashtotaltoget = stashurlsFull.length;
      // if (message[2] == "Standard") {
      //   stashtotaltoget = 10;
      //   responseNumTabsTotal = 10;
      // }
      if (Number(responseNumTabsTotal) > 40) {
        stashtotaltoget = 40;
        responseNumTabsTotal = 40;
      }
      console.log(responseNumTabsTotal, stashtotaltoget);
      console.log(stashurlsFull);
      // get all stash data
      let promisesurls = [];
      // ## CHANGE HERE FOR RATE LIMIT

      // Currently just setting to 48 for testing.
      // for (let x = 0; x < stashtotaltoget; x++) {
      //   // CHANGE HERE FOR RATE LIMIT
      //   // ## CHANGE HERE FOR RATE LIMIT
      //   // for (let x = 0; x < 5; x++) {
      //   promisesurls.push(
      //     axios.get(stashurlsFull[x], {
      //       headers: {
      //         cookie: "POESESSID=" + sessionid //the token is a variable which holds the token
      //       }
      //     })
      //   );
      // }

      // event.sender.send(
      //   "ping-async",
      //   this.stashdata,
      //   this.poeNinjaResponseArray,
      //   this.fullstashdata
      // );
      // let stashdatawhy=[]
      for (let x = 0; x < stashurlsFull.length; x++) {
        await axios
          .get(stashurlsFull[x], {
            headers: {
              cookie: "POESESSID=" + sessionid //the token is a variable which holds the token
            }
          })
          .then(response => {
            //this will be executed only when all requests are complete
            // console.log("Currency: ", responseArr[0].data);
            this.fullstashdata = response; // currency
            // console.log(response.data);
            stashdatatemp.push(response);
            console.log(
              response.headers["x-rate-limit-account"],
              "x-rate-limit-account"
            );
            console.log(
              response.headers["x-rate-limit-account-state"],
              "x-rate-limit-account-state"
            );
            console.log("Stash " + x);
            console.log("Left! total-index= " + (stashurlsFull.length - x));
            event.sender.send("ping-async-stash", [
              "Stash " + x,
              "Left! total-index= " + (stashurlsFull.length - x)
            ]);
            event.sender.send("ping-async-stash", response);
            event.sender.send("ping-async-stashprogressbar", [
              x,
              stashurlsFull.length
            ]);
            // console.log(response);
            // console.log(responseArr[0].data)
            // for (let x = 0; x < stashurlsFull.length; x++) {
            //   console.log(this.fullstashdata[x].data);
            // }
            // this.poeNinjaResponseArray = [
            //   responseArr[0].data,
            // ]; //Changedd to .data
          })
          .catch(e => {
            console.log("Error: in stash responses", e.response.data);
            event.sender.send("ping-async-stash", [
              e.response.data,
              "error in stash responses"
            ]);
          });
        // console.log(stashdatatemp);
        await sleep(1350);
      }
      this.stashdatatemp2 = stashdatatemp;
      event.sender.send("ping-async", this.stashdata, stashdatatemp);
      // axios
      //   .all(promisesurls)
      //   .then(responseArr => {
      //     //this will be executed only when all requests are complete
      //     // console.log("Currency: ", responseArr[0].data);
      //     this.fullstashdata = responseArr; // currency
      //     // console.log(responseArr);
      //     // console.log(responseArr[0].data)
      //     // for (let x = 0; x < stashurlsFull.length; x++) {
      //     //   console.log(this.fullstashdata[x].data);
      //     // }
      //     // this.poeNinjaResponseArray = [
      //     //   responseArr[0].data,
      //     // ]; //Changedd to .data
      //     event.sender.send(
      //       "ping-async",
      //       this.stashdata,
      //       this.poeNinjaResponseArray,
      //       this.fullstashdata
      //     );
      //   })
      //   .catch(e => {
      //     console.log("Error: in stash responses", e.response.data);
      //   });

      // event.sender.send(
      //   "ping-async",
      //   this.stashdata,
      //   this.poeNinjaResponseArray,
      //   this.fullstashdata
      // );
    })
    .catch(e => {
      console.log("Error: ", e.response.data);
      console.log("pathofexile.com Probably Down....");
      event.sender.send("ping-async-stash", e.response.data);
      event.sender.send("ping-async", this.stashdata, null, stashdatatemp2);
    });
  // getter();
  // let giantstasharray = [];
  // if (this.fullstashdata) {
  //   for (let x = 0; x < this.fullstashdata; x++) {
  //     // console.log(resp3[x].data.items);
  //     if (this.fullstashdata[x].data.items) {
  //       giantstasharray.push(this.fullstashdata[x].data.items);
  //     }
  //   }
  // }

  // let bigarrayconcat = [].concat(giantstasharray);
  // let biggestitemarrayever = [];
  // for (var i = 0; i < bigarrayconcat.length; ++i) {
  //   for (var j = 0; j < bigarrayconcat[i].length; ++j)
  //     biggestitemarrayever.push(bigarrayconcat[i][j]);
  // }
  // this.fullstashdata = biggestitemarrayever;
});

// force refresh are and others
ipcMain.on("ping-async", async (event, message) => {
  console.log("hello");
  let sessionid = message[0];
  let accountName = message[1];
  // let league = message[2].split(" ").join("+");
   let league = message[2];
  // let currencyCutoff = message[3];
  event.sender.send("ping-async-stash", [
    "Starting",
    accountName,
    league,
    message[2]
    // currencyCutoff
  ]);
  // const { net } = require("electron");
  // let request = net.request(
  //   "https://www.pathofexile.com/character-window/get-stash-items?league=Blight&accountName=qqazraelz&tabs=0&tabIndex=1"
  // );

  // request.setHeader("Cookie", "POESESSID=" + message[0]);

  // const cookie = {
  //   url: "https://www.pathofexile.com/",
  //   name: "POESESSID",
  //   value: message[0]
  // };

  // request.on("response", response => {
  //   console.log(`STATUS: ${response.statusCode}`);
  //   console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
  //   response.on("data", chunk => {
  //     console.log(`BODY: ${chunk}`);
  //   });
  //   response.on("end", () => {
  //     console.log("No more data in response.");
  //   });
  // });
  // request.end();
  // console.log(message);
  //TODO
  // get the number of tabs, concat the response data
  // let urls: string[] = [
  //   "https://www.pathofexile.com/character-window/get-stash-items?league=" +
  //     message[2] +
  //     "&accountName=qqazraelz&tabs=1&tabIndex=1",
  //   "https://www.pathofexile.com/character-window/get-stash-items?league=" +
  //     message[2] +
  //     "&accountName=qqazraelz&tabs=1&tabIndex=2"
  // ];
  let poeninjaleaguename = message[2];
  if (poeninjaleaguename.includes("SSF Metamorph HC")){
    poeninjaleaguename="Metamorph";
  }
  if (poeninjaleaguename.includes("SSF ")) {
    poeninjaleaguename = poeninjaleaguename.replace("SSF ", "");
  }
  if (poeninjaleaguename == "Hardcore Metamorph") {
    poeninjaleaguename = "Metamorph";
  }
 
  console.log(message[2],poeninjaleaguename)
  // https://www.pathofexile.com/character-window/get-stash-items?league=Blight&accountName=qqazraelz&tabs=0
  // {"numTabs":39}
  let baseURL =
    "https://poe.ninja/api/data/ItemOverview?league=" +
    encodeURI(poeninjaleaguename) +
    "&type=";
  let urlendings: string[] = [
    "Currency", // currency has currencyoveriew and Itemoveriew updated
    "https://poe.ninja/api/data/currencyoverview?league=" +
      encodeURI(poeninjaleaguename) +
      "&type=Fragment", //currency is different url
    "Oil",
    "Fossil",
    "Resonator",
    "Scarab",
    "Essence",
    "DivinationCard",
    "Prophecy",
    "UniqueJewel",
    "UniqueWeapon",
    "UniqueArmour",
    "UniqueAccessory",
    "UniqueFlask",
    "Incubator",
    "SkillGem"
  ];

  let poeNinjaResponseArray;
  let currencyDataResponse;
  let fragmentsDataResponse;
  let oilsDataResponse;
  let fossilsDataResponse;
  let scarabsDataResponse;
  let divsDataResponse;
  let resonatorsDataResponse;
  let propheciesDataResponse;
  let uniqueweaponsDataResponse;
  let uniquearmoursDataResponse;
  let uniqueaccessoriesDataResponse;
  let uniquejewelDataResponse;
  let uniqueflaskDataResponse;
  let incubatorDataResponse;
  let essenceDataResponse;
  let skillgemDataResponse;
  let stashdata;

  event.sender.send("ping-async-stash", [
    "getting poeninja data,",
    accountName,
    encodeURI(poeninjaleaguename)
    // currencyCutoff
  ]);
  await axios
    .all([
      axios.get(baseURL + urlendings[0]), //Currency
      axios.get(urlendings[1]), //fragments
      axios.get(baseURL + urlendings[2]), //oils
      axios.get(baseURL + urlendings[3]), //fossil
      axios.get(baseURL + urlendings[4]), //resonator
      axios.get(baseURL + urlendings[5]), //scarab
      axios.get(baseURL + urlendings[6]), //essence
      axios.get(baseURL + urlendings[7]), //div
      axios.get(baseURL + urlendings[8]), //prophecies
      axios.get(baseURL + urlendings[9]), //uniquejewels
      axios.get(baseURL + urlendings[10]), //uniqueweapons
      axios.get(baseURL + urlendings[11]), //uniquearmours
      axios.get(baseURL + urlendings[12]), //uniqueaccessory
      axios.get(baseURL + urlendings[13]), //UniqueFlask
      axios.get(baseURL + urlendings[14]), //incubator
      axios.get(baseURL + urlendings[15]) //Skill Gems
    ])
    // .catch(e => {
    //   console.log("Error: ", e.response.data);
    // })
    .then(responseArr => {
      //this will be executed only when all requests are complete
      // console.log("Currency: ", responseArr[0].data);

      this.currencyDataResponse = responseArr[0].data; // currency
      this.fragmentsDataResponse = responseArr[1].data; //frag
      this.oilsDataResponse = responseArr[2].data; //oils
      this.fossilsDataResponse = responseArr[3].data; //fossil
      this.resonatorsDataResponse = responseArr[4].data; //reso
      this.scarabsDataResponse = responseArr[5].data; //scarab
      this.essenceDataResponse = responseArr[6].data; //essense
      this.divsDataResponse = responseArr[7].data; //divs
      this.propheciesDataResponse = responseArr[8].data; //prop
      this.uniquejewelDataResponse = responseArr[9].data; //jewels
      this.uniqueweaponsDataResponse = responseArr[10].data; //wapons
      this.uniquearmoursDataResponse = responseArr[11].data; //armor
      this.uniqueaccessoriesDataResponse = responseArr[12].data; //access
      this.uniqueflaskDataResponse = responseArr[13].data; //flask
      this.incubatorDataResponse = responseArr[14].data; //incubator
      this.skillgemDataResponse = responseArr[15].data; //skillgem
      // console.log("Fragments: ", responseArr[1].data);
      // console.log("Oils: ", responseArr[2].data);
      // console.log("Fossils: ", responseArr[3].data);
      // console.log("Resonators: ", responseArr[4].data);
      // console.log("Scarabs: ", responseArr[5].data);
      // console.log("Divs: ", responseArr[6].data);
      // console.log("Prophecies: ", responseArr[7].data);
      // console.log("Unique Jewels: ", responseArr[8].data);
      // console.log("Unique Weapons: ", responseArr[9].data);
      // console.log("Unique Armours: ", responseArr[10].data);
      // console.log("Unique Accessories: ", responseArr[11].data);
      // console.log("Unique Flasks: ", responseArr[12].data);
      // console.log("Unique Jewels: ", responseArr[13].data);
      // poeNinjaResponseArray = responseArr; //Changedd to .data
      this.poeNinjaResponseArray = [
        responseArr[0].data,
        responseArr[1].data,
        responseArr[2].data,
        responseArr[3].data,
        responseArr[4].data,
        responseArr[5].data,
        responseArr[6].data,
        responseArr[7].data,
        responseArr[8].data,
        responseArr[9].data,
        responseArr[10].data,
        responseArr[11].data,
        responseArr[12].data,
        responseArr[13].data,
        responseArr[14].data,
        responseArr[15].data
      ]; //Changedd to .data
    })
    .catch(e => {
      console.log("Error:  POE NINJA GET ERROR", e.response.data);
      event.sender.send("ping-async-stash", [
        e.response.data,
        "error in poeninja data"
      ]);
    });
  event.sender.send("ping-async-stash", [
    "backend poedata going to sleep for 2 seconds now",
    this.poeNinjaResponseArray
  ]);
  await sleep(2000);
  // .then(
  //   axios.spread(function(resp2, reposResponse) {
  //     //... but this callback will be executed only when both requests are complete.
  //     console.log("User", resp2.data);
  //     // console.log("Repositories", reposResponse.data);
  //   })
  // );
  // let downloadurl = (a, b) =>
  //   `https://www.pathofexile.com/character-window/get-stash-items?league=Blight&accountName=${a}&tabIndex=0&tabs=${b}`;
  // let stashurl2 =
  //   "https://www.pathofexile.com/character-window/get-stash-items?league={}&accountName={}&tabs={}";
  let addinURL = "&tabIndex=";
  let stashTabWhiteList = [
    "DivinationCardStash",
    "PremiumStash",
    "QuadStash",
    "NormalStash",
    "CurrencyStash",
    "FragmentStash",
    "EssenceStash"
  ];
  let stashurlsFull = [];

  //   axios
  //     .get(
  //       "https://www.pathofexile.com/character-window/get-stash-items?league=Blight&accountName=" +
  //       message[1] +
  //       "&tabs=0&tabIndex=",
  //       {
  //         headers: {
  //           cookie: "POESESSID=" + message[0] //the token is a variable which holds the token
  //         }
  //       }
  //     )
  //     .then(response => {
  //       // var finalObj = finalObj.concat(response); // should concat the data
  //       // console.log(response.data);
  //       // message = response.data as RootObject;
  //       // this.stashdata = response.data;
  //       // event.sender.send(
  //       //   "ping-async",
  //       //   this.stashdata,
  //       //   this.poeNinjaResponseArray
  //       // );
  //     })
  //     .catch(e => {
  //       console.log("Error: ", e.response.data);
  //       console.log("pathofexile.com Probably Down....");
  //     //   event.sender.send("ping-async", null, this.poeNinjaResponseArray);
  //     // });
  //   // getter();
  // });
  // await sleep(10000);

  // console.log("hello after sleep");
  // await sleep(10000);
  event.sender.send("ping-async-stash", "starting stash");
  await axios
    .get(
      "https://www.pathofexile.com/character-window/get-stash-items?league=" +
        league +
        "&accountName=" +
        accountName +
        "&tabs=0&tabIndex=0",
      {
        headers: {
          cookie: "POESESSID=" + sessionid //the token is a variable which holds the token
        }
      }
    )
    .then(async response => {
      // var finalObj = finalObj.concat(response); // should concat the data
      console.log(response.headers);
      // message = response.data as RootObject;
      let stashdatatemp = [];
      this.stashdata = response.data;
      event.sender.send("ping-async-stash", [
        response,
        "got stash data" + "tab count " + Number(response.data.numTabs)
      ]);
      event.sender.send("ping-async-stashprogressbar", [
        0,
        stashurlsFull.length
      ]);
      await sleep(10000);
      // get stash data
      let responseNumTabsTotal = response.data.numTabs;
      // event.returnValue = [
      //   ["Stash " + x],
      //   ["Left! total-index= " + (stashurlsFull.length - x)]
      // ];
      event.returnValue = ["hi"];
      // let numTabsResponse =
      for (let x = 0; x < Number(responseNumTabsTotal); x++) {
        stashurlsFull.push(
          "https://www.pathofexile.com/character-window/get-stash-items?league=" +
            league +
            "&accountName=" +
            accountName +
            "&tabs=0&tabIndex=" +
            x
        );
      }
      let stashtotaltoget = stashurlsFull.length;
      // if (message[2] == "Standard") {
      //   stashtotaltoget = 10;
      //   responseNumTabsTotal = 10;
      // }
      if (Number(responseNumTabsTotal) > 40) {
        stashtotaltoget = 40;
        responseNumTabsTotal = 40;
      }
      console.log(responseNumTabsTotal, stashtotaltoget);
      console.log(stashurlsFull);
      // get all stash data
      let promisesurls = [];
      // ## CHANGE HERE FOR RATE LIMIT

      // Currently just setting to 48 for testing.
      // for (let x = 0; x < stashtotaltoget; x++) {
      //   // CHANGE HERE FOR RATE LIMIT
      //   // ## CHANGE HERE FOR RATE LIMIT
      //   // for (let x = 0; x < 5; x++) {
      //   promisesurls.push(
      //     axios.get(stashurlsFull[x], {
      //       headers: {
      //         cookie: "POESESSID=" + sessionid //the token is a variable which holds the token
      //       }
      //     })
      //   );
      // }

      // event.sender.send(
      //   "ping-async",
      //   this.stashdata,
      //   this.poeNinjaResponseArray,
      //   this.fullstashdata
      // );
      // let stashdatawhy=[]
      for (let x = 0; x < stashurlsFull.length; x++) {
        await axios
          .get(stashurlsFull[x], {
            headers: {
              cookie: "POESESSID=" + sessionid //the token is a variable which holds the token
            }
          })
          .then(response => {
            //this will be executed only when all requests are complete
            // console.log("Currency: ", responseArr[0].data);
            this.fullstashdata = response; // currency
            // console.log(response.data);
            stashdatatemp.push(response);
            console.log(
              response.headers["x-rate-limit-account"],
              "x-rate-limit-account"
            );
            console.log(
              response.headers["x-rate-limit-account-state"],
              "x-rate-limit-account-state"
            );
            console.log("Stash " + x);
            console.log("Left! total-index= " + (stashurlsFull.length - x));
            event.sender.send("ping-async-stash", [
              "Stash " + x,
              "Left! total-index= " + (stashurlsFull.length - x)
            ]);
            event.sender.send("ping-async-stash", response);
            event.sender.send("ping-async-stashprogressbar", [
              x,
              stashurlsFull.length
            ]);
            // console.log(response);
            // console.log(responseArr[0].data)
            // for (let x = 0; x < stashurlsFull.length; x++) {
            //   console.log(this.fullstashdata[x].data);
            // }
            // this.poeNinjaResponseArray = [
            //   responseArr[0].data,
            // ]; //Changedd to .data
          })
          .catch(e => {
            console.log("Error: in stash responses", e.response.data);
            event.sender.send("ping-async-stash", [
              e.response.data,
              "error in stash response"
            ]);
          });
        // console.log(stashdatatemp);
        await sleep(1350);
      }
      event.sender.send("ping-async-stashprogressbar", [
        stashurlsFull.length,
        stashurlsFull.length
      ]);
      event.sender.send(
        "ping-async",
        this.stashdata,
        this.poeNinjaResponseArray,
        stashdatatemp
      );
      // axios
      //   .all(promisesurls)
      //   .then(responseArr => {
      //     //this will be executed only when all requests are complete
      //     // console.log("Currency: ", responseArr[0].data);
      //     this.fullstashdata = responseArr; // currency
      //     // console.log(responseArr);
      //     // console.log(responseArr[0].data)
      //     // for (let x = 0; x < stashurlsFull.length; x++) {
      //     //   console.log(this.fullstashdata[x].data);
      //     // }
      //     // this.poeNinjaResponseArray = [
      //     //   responseArr[0].data,
      //     // ]; //Changedd to .data
      //     event.sender.send(
      //       "ping-async",
      //       this.stashdata,
      //       this.poeNinjaResponseArray,
      //       this.fullstashdata
      //     );
      //   })
      //   .catch(e => {
      //     console.log("Error: in stash responses", e.response.data);
      //   });

      // event.sender.send(
      //   "ping-async",
      //   this.stashdata,
      //   this.poeNinjaResponseArray,
      //   this.fullstashdata
      // );
    })
    .catch(e => {
      console.log("Error: ", e.response.data);
      console.log("pathofexile.com Probably Down....");
      event.sender.send("ping-async-stash", [
        e.response.data,
        "error PoE might be down?"
      ]);
      event.sender.send("ping-async", null, this.poeNinjaResponseArray, null);
    });
  // getter();
  // let giantstasharray = [];
  // if (this.fullstashdata) {
  //   for (let x = 0; x < this.fullstashdata; x++) {
  //     // console.log(resp3[x].data.items);
  //     if (this.fullstashdata[x].data.items) {
  //       giantstasharray.push(this.fullstashdata[x].data.items);
  //     }
  //   }
  // }

  // let bigarrayconcat = [].concat(giantstasharray);
  // let biggestitemarrayever = [];
  // for (var i = 0; i < bigarrayconcat.length; ++i) {
  //   for (var j = 0; j < bigarrayconcat[i].length; ++j)
  //     biggestitemarrayever.push(bigarrayconcat[i][j]);
  // }
  // this.fullstashdata = biggestitemarrayever;
});
const axios = require("axios").default;

///Sync
ipcMain.on("ping-sync", (event, message) => {
  message = "pong";

  event.returnValue = message;
});

ipcMain.on("get-stash-names", async (event, message) => {
  console.log("hello");
  let sessionid = message[0];
  let accountName = message[1];
  let league = message[2].split(" ").join("+");
  // let currencyCutoff = message[3];
  event.sender.send("ping-async-stash", [
    "Starting",
    accountName,
    league,
    message[2]
    // currencyCutoff
  ]);

  event.sender.send("ping-async-stash", "starting stash");
  await axios
    .get(
      "https://www.pathofexile.com/character-window/get-stash-items?league=" +
        league +
        "&accountName=" +
        accountName +
        "&tabs=1&tabIndex=1",
      {
        headers: {
          cookie: "POESESSID=" + sessionid //the token is a variable which holds the token
        }
      }
    )
    .then(async response => {
      // // var finalObj = finalObj.concat(response); // should concat the data
      console.log(response);
      // // message = response.data as RootObject;
      // let stashdatatemp = [];
      // this.stashdata = response.data;
      event.sender.send("get-stash-names", [response.data, "got stash data"]);
      // event.sender.send("ping-async-stashprogressbar", [
      //   0,
      //   stashurlsFull.length
      // ]);
      // await sleep(10000);
      // // get stash data
      // let responseNumTabsTotal = response.data.numTabs;
      // // event.returnValue = [
      // //   ["Stash " + x],
      // //   ["Left! total-index= " + (stashurlsFull.length - x)]
      // // ];
      // event.returnValue = ["hi"];
      // // let numTabsResponse =
      // for (let x = 0; x < Number(responseNumTabsTotal); x++) {
      //   stashurlsFull.push(
      //     "https://www.pathofexile.com/character-window/get-stash-items?league=" +
      //     league +
      //     "&accountName=" +
      //     accountName +
      //     "&tabs=0&tabIndex=" +
      //     x
      //   );
      // }
      // let stashtotaltoget = stashurlsFull.length;
      // if (Number(responseNumTabsTotal) > 40) {
      //   stashtotaltoget = 40;
      //   responseNumTabsTotal = 40;
      // }
      // console.log(responseNumTabsTotal, stashtotaltoget);
      // console.log(stashurlsFull);
      // // get all stash data
      // let promisesurls = [];
      // for (let x = 0; x < stashurlsFull.length; x++) {
      //   await axios
      //     .get(stashurlsFull[x], {
      //       headers: {
      //         cookie: "POESESSID=" + sessionid //the token is a variable which holds the token
      //       }
      //     })
      //     .then(response => {
      //       //this will be executed only when all requests are complete
      //       // console.log("Currency: ", responseArr[0].data);
      //       this.fullstashdata = response; // currency
      //       // console.log(response.data);
      //       stashdatatemp.push(response);
      //       console.log(
      //         response.headers["x-rate-limit-account"],
      //         "x-rate-limit-account"
      //       );
      //       console.log(
      //         response.headers["x-rate-limit-account-state"],
      //         "x-rate-limit-account-state"
      //       );
      //       console.log("Stash " + x);
      //       console.log("Left! total-index= " + (stashurlsFull.length - x));
      //       event.sender.send("ping-async-stash", [
      //         "Stash " + x,
      //         "Left! total-index= " + (stashurlsFull.length - x)
      //       ]);
      //       event.sender.send("ping-async-stash", response);
      //       event.sender.send("ping-async-stashprogressbar", [
      //         x,
      //         stashurlsFull.length
      //       ]);
      //     })
      //     .catch(e => {
      //       console.log("Error: in stash responses", e.response.data);
      //       event.sender.send("ping-async-stash", [
      //         e.response.data,
      //         "error in stash response"
      //       ]);
      //     });
      //   // console.log(stashdatatemp);
      //   await sleep(1350);
      // }
      // event.sender.send("ping-async-stashprogressbar", [
      //   stashurlsFull.length,
      //   stashurlsFull.length
      // ]);
      // event.sender.send(
      //   "ping-async",
      //   this.stashdata,
      //   this.poeNinjaResponseArray,
      //   stashdatatemp
      // );
    })
    .catch(e => {
      console.log("Error: ", e.response.data);
      // console.log("pathofexile.com Probably Down....");
      event.sender.send("get-stash-names", [
        e.response.data,
        "get stash names error?"
      ]);
      event.sender.send("get-stash-names", null);
    });
});

// import { PythonShell } from "python-shell";
let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === "--serve");

function createWindow() {
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    icon: path.join(__dirname, "assets/favicon.png"),
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (serve) {
    require("electron-reload")(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL("http://localhost:4200");
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, "dist/index.html"),
        protocol: "file:",
        slashes: true
      })
    );
  }

  if (serve) {
    // Menu.getApplicationMenu().append(
    //   new MenuItem({
    //     label: "File",
    //     submenu: [
    //       {
    //         label: "hello ",
    //         click() {
    //           console.log("Oh, hi there!");
    //         }
    //       }
    //     ]
    //   })
    // );
    // console.log(Menu.getApplicationMenu().items, " menu items");
    // [25880: 1011 / 085007.559: ERROR: CONSOLE(109)]
    //  "Uncaught (in promise) Error: Could not instantiate: ProductRegistryImpl.Registry",
    // source: devtools://devtools/bundled/shell.js (109)
    // win.webContents.once("dom-ready", () => {
    win.webContents.openDevTools();

    // });
    // win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on("closed", () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on("ready", createWindow);

  // Quit when all windows are closed.
  app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
}
function sleep(ms) {
  console.log("Time: " + new Date());
  console.log("waiting : ", ms, "Seconds");
  return new Promise(resolve => setTimeout(resolve, ms));
}
