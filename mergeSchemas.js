const { mergeTypeDefs } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { writeFileSync } = require("fs");
const path = require("path");
const { print } = require("graphql");

const typesArray = loadFilesSync(path.join(__dirname, "appsync/schemas"), {
  extensions: ["graphql"],
});
const typeDefs = mergeTypeDefs(typesArray);

const typeDefsString = print(typeDefs);

writeFileSync(path.join(__dirname, "appsync/schema.graphql"), typeDefsString);
console.log("Schema merged successfully!");

const comment = {
  entry: [
    {
      id: "17841460585820002",
      time: 1749611986,
      changes: [
        {
          value: {
            from: { id: "1095286881499969", username: "_akshit_2002" },
            media: { id: "18480725158066625", media_product_type: "REELS" },
            id: "17885516967292207",
            text: "Sam testing",
          },
          field: "comments",
        },
      ],
    },
  ],
  object: "instagram",
};

const parentComment = {
  entry: [
    {
      id: "17841401270106762",
      time: 1749608261,
      changes: [
        {
          value: {
            from: {
              id: "17841401270106762",
              username: "allen_choudhary",
              self_ig_scoped_id: "1282868406414816",
            },
            media: { id: "17904624453146285", media_product_type: "REELS" },
            id: "18070882846959779",
            parent_id: "18104249791523536",
            text: "@macwan_krishilll_10 Product link Sent!  Checkout Your Dm \\u2705\\u2764\\ufe0f",
          },
          field: "comments",
        },
      ],
    },
  ],
  object: "instagram",
};

const msg = {
  object: "instagram",
  entry: [
    {
      time: 1749608227772,
      id: "17841400651924702",
      messaging: [
        {
          sender: { id: "17841400651924702" },
          recipient: { id: "567005946203090" },
          timestamp: 1749608226092,
          message: {
            mid: "aWdfZAG1faXRlbToxOklHTWVzc2FnZAUlEOjE3ODQxNDAwNjUxOTI0NzAyOjM0MDI4MjM2Njg0MTcxMDMwMTI0NDI1OTg0MDY5NTAxMTkxMDU4OTozMjI3NDU3NTE3NTk4NDUxMjQ1ODk0ODE1NzIyOTc2MDUxMgZDZD",
            text: "I'm Bharthi, Social Media Manager for Mr. Sabyasachi (aka Foodaholix), a well-known food, travel & lifestyle blogger from Hyderabad with a loyal audience. He has collaborated with brands like Ensure Diabetes Care, Sensodyne, Thrillophilia, and Preethi Appliances, and featured with Chef Sanjeev Kapoor here: https:\\/\\/www.youtube.com\\/watch?v=HQt66gXwJM)\\n\\nHis blog foodaholix.in and articles in New Indian Express (https:\\/\\/www.newindianexpress.com\\/author\\/sabyasachi-roy-chaudhuri), TOI & Wow Hyderabad are widely appreciated.\\n\\nWe\\u2019d love to collaborate and showcase your brand through engaging content on Instagram, Facebook, and our blog. Let\\u2019s connect to explore possibilities!\\n\\nBest,\\nBharthi Kanodia\\n+91 88014 84736",
            is_echo: true,
          },
        },
      ],
    },
  ],
};

const storyMsg = {
  object: "instagram",
  entry: [
    {
      time: 1749608227676,
      id: "17841451252021208",
      messaging: [
        {
          sender: { id: "17841451252021208" },
          recipient: { id: "1370697687571434" },
          timestamp: 1749608226784,
          message: {
            mid: "aWdfZAG1faXRlbToxOklHTWVzc2FnZAUlEOjE3ODQxNDUxMjUyMDIxMjA4OjM0MDI4MjM2Njg0MTcxMDMwMTI0NDI1OTA2NjQyODUwMjY3MDY5NDozMjI3NDU3NTE4ODc1MDM2MDMzNDIyOTk2NzkxMDk5MzkyMAZDZD",
            text: "Congratulations \\ud83e\\udd73 bua bn gyi \\ud83d\\ude42",
            reply_to: {
              story: {
                url: "https:\\/\\/lookaside.fbsbx.com\\/ig_messaging_cdn\\/?asset_id=18070866619790733&signature=AYekMMOZy3O2xiyPnItUFSiSgf942FSFUyYymFJY1Dxh9zkzaC4dQwjPkdTzTH_paqH7S3cWWYTLY46vuv0DoC0TrZ19n_iW-NQXIMBZD8Zd4LaszWhpoRNq52cvsivY8RAYldbr7moaRm_ZDmETLo6eZ96OB7tzTgw-L3NnXxokD_NNjtY0sKDuWsXyulKXcyprgBC0h5_KJtN16XaVJKa-lurJq3Yc",
                id: "18070866619790733",
              },
            },
            is_echo: true,
          },
        },
      ],
    },
  ],
};

const readMsg = {
  object: "instagram",
  entry: [
    {
      time: 1749608245096,
      id: "17841404591109445",
      messaging: [
        {
          sender: { id: "30372899438968048" },
          recipient: { id: "17841404591109445" },
          timestamp: 1749608244655,
          read: {
            mid: "aWdfZAG1faXRlbToxOklHTWVzc2FnZAUlEOjE3ODQxNDA0NTkxMTA5NDQ1OjM0MDI4MjM2Njg0MTcxMDMwMTI0NDI1ODc0NjY2NjAxNDY0NzQwNzozMjI3Mzk2NDg3NTE1ODgwNjU5MDI4MDExMTk5NDQzNzYzMgZDZD",
          },
        },
      ],
    },
  ],
};

const dmWithAttach = {
  object: "instagram",
  entry: [
    {
      time: 1749608250060,
      id: "17841401270106762",
      messaging: [
        {
          sender: { id: "9251885194858297" },
          recipient: { id: "17841401270106762" },
          timestamp: 1749608249291,
          message: {
            mid: "aWdfZAG1faXRlbToxOklHTWVzc2FnZAUlEOjE3ODQxNDAxMjcwMTA2NzYyOjM0MDI4MjM2Njg0MTcxMDMwMTI0NDI1OTY5MzgzMjE4NjYxMDQyNTozMjI3NDU3NTYwMzkyOTk3NDgyMjYxMzgzMzg4Mjc5NjAzMgZDZD",
            attachments: [
              {
                type: "ig_reel",
                payload: {
                  reel_video_id: "18058345124001096",
                  title:
                    "MrBeast Prisoned!! \\ud83d\\ude2e\\n.\\n.\\n.\\n#reels #viral #comedy #entertainment #motivation #mrbeast #education",
                  url: "https:\\/\\/lookaside.fbsbx.com\\/ig_messaging_cdn\\/?asset_id=18058345124001096&signature=AYf0910RX-aOnGBMHWUJUscKosK9DLCLBbnRAAM3Tcm-GzyiuiPZKVRDqwwDUntuWoKDz8DRJV38KvibXXAw7FjqVP86rZMeG7LOYA7t2PDLlGuP_fOdatnk1KzTXD7QlBeMm6Z1w_ZcnFr9fJiNfIniYNeyIAV581QVSLlclsu-yHJfqZ-PhG9FXXQM7p68M4QTD-OTryW54o4CQMzRn1-12pbESoiW",
                },
              },
            ],
          },
        },
      ],
    },
  ],
};

const dmWithTemplate = {
  object: "instagram",
  entry: [
    {
      time: 1749608258941,
      id: "17841401270106762",
      messaging: [
        {
          sender: { id: "17841401270106762" },
          recipient: { id: "580657314703245" },
          timestamp: 1749608257263,
          message: {
            mid: "aWdfZAG1faXRlbToxOklHTWVzc2FnZAUlEOjE3ODQxNDAxMjcwMTA2NzYyOjM0MDI4MjM2Njg0MTcxMDMwMTI0NDI1OTcyOTA1MjAwNjQyMTc3NjozMjI3NDU3NTc1MDk4NDEzNTA1Nzc4MTI1OTA2NTM2MDM4NAZDZD",
            attachments: [
              {
                type: "template",
                payload: {
                  generic: {
                    elements: [
                      {
                        title: "Pilgrim Redensyl 3\\u0025 + Anagain...",
                        image_url:
                          "https:\\/\\/m.media-amazon.com\\/images\\/I\\/41AFOYC1ehL.jpg?time=1749608255",
                        subtitle: "Powered by WISHLINK",
                        default_action: {
                          type: "open_url",
                          url: "https:\\/\\/www.wishlink.com\\/share\\/99c6s.pdf?source=ctk&subId1=580657314703245",
                        },
                        buttons: [
                          {
                            type: "open_url",
                            url: "https:\\/\\/www.wishlink.com\\/share\\/99c6s.pdf?source=ctk&subId1=580657314703245",
                            title: "Shop On Amazon",
                          },
                          {
                            type: "open_url",
                            url: "https:\\/\\/www.wishlink.com\\/allenchoudhary\\/post\\/1642115?utm_source=ctk&utm_medium=ctk&utm_campaign=ctk",
                            title: "Visit my Wishlink",
                          },
                        ],
                      },
                      {
                        title: "Wishlink",
                        image_url:
                          "https:\\/\\/d3g01po1nkka75.cloudfront.net\\/ctk-experiment\\/last-card.png",
                        subtitle: "Open in App",
                        default_action: {
                          type: "open_url",
                          url: "https:\\/\\/www.wishlink.com\\/redirect\\/?utm_source=wishlink&utm_medium=ctk&utm_campaign=CTK_Var2&insta_user_id=580657314703245&insta_username=macwan_krishilll_10&type=ctk_nudge&creator=allenchoudhary&post_id=1642115&variant=variant_2",
                        },
                        buttons: [
                          {
                            type: "open_url",
                            url: "https:\\/\\/www.wishlink.com\\/redirect\\/?utm_source=wishlink&utm_medium=ctk&utm_campaign=CTK_Var2&insta_user_id=580657314703245&insta_username=macwan_krishilll_10&type=ctk_nudge&creator=allenchoudhary&post_id=1642115&variant=variant_2",
                            title: "Shop My Looks",
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            ],
            is_echo: true,
          },
        },
      ],
    },
  ],
};
