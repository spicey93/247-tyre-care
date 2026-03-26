export type GoogleReview = {
  text: string;
  name: string;
};

/** Aggregate stats from Google Business (carousel shows a sample). */
export const googleReviewsPublicStats = {
  rating: 5.0,
  countOnGoogle: 74,
} as const;

/** Sample quotes for the homepage carousel. */
export const googleReviews: GoogleReview[] = [
  {
    name: "Barry Tunnicliffe",
    text: "Top work from Luis, always a pleasure to deal with and very professional, wheels and tyres are expensive and it’s good to see someone who treats them with care. Being mobile is an extra bonus as I didn’t need to take any time off from work. Wouldn’t hesitate to recommend 24/7 Tyre Care to anyone in the local area.",
  },
  {
    name: "Emma Holmes",
    text: "I was stuck in the dark with a completely flat tyre — 247 Tyre Care responded quickly (around 60 mins), kept me up to date with any delays and were reasonably priced compared to other companies I rang! The guy was really friendly and helpful — felt very safe too being a lone woman in the dark!",
  },
  {
    name: "Kathryn Heathcote",
    text: "Brilliant service from Luis. Came out on a Sunday at an hour’s notice to fit a new tyre for my car, after I’d driven into a pothole last night. Really friendly and helpful, all completed super quick and at a reasonable price. Would 100% recommend — much better than having to sit in a garage. Thank you Luis.",
  },
  {
    name: "Andrew Yiacoumi",
    text: "Luis is very professional and honest. Kept me updated on ETA and arrived in the time he said he would to fit a new tyre. Price was fair and got me back on the road for my 100 mile trip back down to London. Would highly recommend.",
  },
  {
    name: "Vicki Jones",
    text: "We had a puncture but had lost our wheel locking nut. Lewis managed to source one, change the tyre and leave us a new nut, all for a very reasonable price. He’s also a very friendly guy. Will definitely use him again if we need to.",
  },
  {
    name: "Michael Bicknell",
    text: "I would give 10 stars if I could. Called at 7:30am and Luis was with me within the 45 minutes he had promised. First impressions: clean van, clean uniform and very pleasant and personable, even though it was early Sunday morning.",
  },
  {
    name: "Lewis Desmond",
    text: "Fast and friendly service and great value for money. Luis advised me the best tyre to get while keeping my budget in mind and arrived the next day to fit them and also cleaned my wheel. Great value for money too, compared to other companies who advertise low priced tyres but add on multiple charges for fitting/booking slot etc.",
  },
  {
    name: "Vishal Patel",
    text: "The service was gold standard. It’s always good when someone on the other side of the phone is helpful and responsive when you are stuck! I will always go to these guys now.",
  },
  {
    name: "Christopher Thulborn",
    text: "24/7 Tyre Care lives up to the name! It’s the early hours of the morning and my tyre has been replaced on my driveway! Great price! He’s friendly and takes pride in his work, highly recommend!",
  },
  {
    name: "Fru Partington",
    text: "Luis is a lifesaver! I was leaving Northampton at 4am on a Saturday to catch a Eurotunnel train, car load full (including my dog), when I hit a pothole in the rain and had a puncture at the end of my road! Called a couple of numbers — no one could help — then reached 247 Tyre Care (Luis) who was super calm and professional, told me clearly what was needed, and arrived within an hour with a new tyre! Such a relief! Price was reasonable, service brilliant. Luckily I caught my Eurotunnel train and onward journey. Thank you so much!",
  },
];
