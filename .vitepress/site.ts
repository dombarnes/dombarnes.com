export interface SocialLink {
  icon: string
  url?: string
  username?: string
  desc?: string
  shareUrl?: string
  shareTitle?: string
  shareLink?: string
}

export const site = {
  title: "Dom Barnes",
  description: "Hi I'm @domster. I write about technology mostly.",
  email: "dom@dombarnes.com",
  logo: "/assets/images/df_logo.jpg",
  cover: "/assets/images/ipad_coffee.jpg",
  name: "Dom Barnes",
  author: "Dom Barnes",
  authorImage: "/assets/images/author.jpg",
  url: "https://dombarnes.com",
  twitterHandle: "@domster",
  perPage: 8,
  social: [
    {
      icon: "twitter",
      username: "domster",
      url: "https://twitter.com/domster",
      desc: "Follow me on twitter",
      shareUrl: "https://twitter.com/share",
      shareTitle: "?text=",
      shareLink: "&url="
    },
    {
      icon: "github",
      url: "https://github.com/dombarnes",
      desc: "Fork me on github"
    }
  ] as SocialLink[]
}
