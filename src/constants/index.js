import { people01, people02, people03, facebook, instagram, linkedin, twitter, airbnb, binance, coinbase, dropbox, send, shield, star  } from "../assets";

export const navLinks = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "aboutus",
    title: "About Us",
  },
  {
    id: "blog",
    title: "Blog",
  },
  {
    id: "login",
    title: "Login",
  },
];

export const features = [
  {
    id: "feature-1",
    icon: star,
    title: "Rewards",
    content:
      "The best credit cards offer some tantalizing combinations of promotions and prizes",
  },
  {
    id: "feature-2",
    icon: shield,
    title: "100% Secured",
    content:
      "We take proactive steps make sure your information and transactions are secure.",
  },
  {
    id: "feature-3",
    icon: send,
    title: "Balance Transfer",
    content:
      "A balance transfer credit card can save you a lot of money in interest charges.",
  },
];

export const feedback = [
  {
    id: "feedback-1",
    content:
      "Ex-Roblox",
    name: "Bernard Kim",
    title: "Founder",
    img: people01,
  },
  {
    id: "feedback-2",
    content:
      "Ex-TSMC",
    name: "William Chen",
    title: "Founder",
    img: people02,
  },
];

export const stats = [
  {
    id: "stats-1",
    title: "Retention Improvement",
    value: "19%",
  },
  {
    id: "stats-2",
    title: "Users Moderated",
    value: "250K+",
  },
  {
    id: "stats-3",
    title: "Categories of Moderation",
    value: "11",
  },
];

export const footerLinks = [
  {
    title: "Useful Links",
    links: [
      {
        name: "Discord Bot",
        link: "https://discord.com/oauth2/authorize?client_id=1152436728125206628&permissions=21983791152192&scope=bot",
      },
      {
        name: "How it Works",
        link: "https://www.hoobank.com/how-it-works/",
      },
      {
        name: "Explore",
        link: "https://www.hoobank.com/explore/",
      },
      {
        name: "Terms & Services",
        link: "https://www.hoobank.com/terms-and-services/",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        name: "Help Center",
        link: "https://www.hoobank.com/help-center/",
      },
      {
        name: "Suggestions",
        link: "https://www.hoobank.com/suggestions/",
      },
      {
        name: "Blog",
        link: "https://www.hoobank.com/blog/",
      },
    ],
  },
  {
    title: "Contact Us",
    links: [
      {
        name: "contact@osmosys.ai",
        link: "https://www.hoobank.com/our-partner/",
      },
    ],
  },
];

export const socialMedia = [
  {
    id: "social-media-1",
    icon: instagram,
    link: "https://www.instagram.com/",
  },
  {
    id: "social-media-2",
    icon: facebook,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    icon: twitter,
    link: "https://www.twitter.com/",
  },
  {
    id: "social-media-4",
    icon: linkedin,
    link: "https://www.linkedin.com/",
  },
];

export const clients = [
  {
    id: "client-1",
    logo: airbnb,
  },
  {
    id: "client-2",
    logo: binance,
  },
  {
    id: "client-3",
    logo: coinbase,
  },
  {
    id: "client-4",
    logo: dropbox,
  },
];

export const onClickBlur = () => {
  let elem = document.activeElement;
  if (elem) {
    elem?.blur();
  }
  elem = document.getElementById("nav-drawer");
  if (elem) {
    elem.checked = false;
  }
  return true;
};

export const COLORS = new Map([
  ['Hate', '#0088FE'],
  ['Hate (Threatening)', '#FFBB28'],
  ['Harassment', '#911EB4'],
  ['Harassment (Threatening)', '#9A6324'],
  ['Self Harm', '#F032E6'],
  ['Self Harm (Intent)', '#3CB44B'],
  ['Self Harm (Instructions)', '#DCBEFF'],
  ['Sexual', '#800000'],
  ['Sexual (Minors)', '#00C49F'],
  ['Violence', '#FF8042'],
  ['Violence (Graphic)', '#FABED4'],
  ['Other', '#3CB44B'],
]);

export const defaultDateRange = [
  // default by last 31 days to current date
  new Date(new Date().setDate(new Date().getDate() - 31)).toLocaleDateString('en-CA'), 
  new Date().toLocaleDateString('en-CA')
];

export const defaultCategories = new Map([
  ['Hate', 1],
  ['Hate (Threatening)', 2],
  ['Harassment', 4],
  ['Harassment (Threatening)', 8],
  ['Self Harm', 16],
  ['Self Harm (Intent)', 32],
  ['Self Harm (Instructions)', 64],
  ['Sexual', 128],
  ['Sexual (Minors)', 256],
  ['Violence', 512],
  ['Violence (Graphic)', 1024],
]);

export const friendlyCategoryToNot = (str) => {
  return str.toLowerCase().replace(/[()]/g, '').replace(/[ ]/g, '_');
};

export const getApiUrl = (() => {
  return import.meta.env.VITE_API_URL ?? 'https://api.osmosys.ai'
})();