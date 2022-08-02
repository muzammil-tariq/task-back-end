const { EMAIL_FROM } = process.env;

module.exports = {
  verificationCode: ({ user, verificationCode }) => ({
    to: user.email,
    from: EMAIL_FROM,
    subject: "ThePartyStarter Verification Code",
    html: "Your Verification code is " + verificationCode,
  }),
  forgotPassword: ({ user, verificationCode }) => ({
    to: user.email,
    from: EMAIL_FROM,
    subject: "ThePartyStarter password reset request",
    html: `We received a password reset request for your account. 
    If you initiated this request then enter this code to continue to process. If this request was not initiated by you then you can ignore this message.
    
    Your Verification code is ${verificationCode}`,
  }),
  signUp: ({ user, verificationCode }) => ({
    to: user.email,
    from: EMAIL_FROM,
    subject: `Hello ${user.fullName}, Welcome to ThePartyStarter!`,
    html: `
    Hello ${user.fullName},
    You want the best of the best, we get that. As you are already off to a great start by signing up 
    with ThePartyStarter. We make your celebrations as simple as ABC – by helping you organize, 
    review, and securely book amazing event vendors. All to make your dream event a reality!🎉
    From an entertainer who leaves your guests rolling on the floor laughing to a dexterous florist🎉, 
    you can select it all on ThePartyStarter.com. 
    Now getting down to brass tacks, please review the important information below and save this 
    email so you can refer to it later while planning your event.🎉
    1: Our <b>Party-Like-Me</b> feature showcases other Party People’s event details for your inspiration. 
    You can request quotes from similar vendors in your area and message them directly on 
    ThePartyStarter to find the best vendor for your budget, theme, and location.
    2: We understand how important it is for you to make your event memorable, and that’s why we 
    don’t leave anything to chance. Our <b>PartyPooper Policy™</b> guarantees vetted vendors, full 
    refunds for no-shows, and ultra-secure payment options.
    3: In case you experience any dissatisfaction with the booking process or event vendors, 
    immediately contact us at hello@thepartystarter.com. Although we do our best to screen each 
    vendor, we encourage you to use your discretion when booking on ThePartyStarter.com.
    4: Lastly, yet equally importantly, we strongly recommend keeping the <b>communication and 
    payments on ThePartyStarter’s website</b> so we can have your back in case of any dispute. 
    Please note, we don’t keep track of your offline activities and we won’t be able to help you with 
    any conflict off the website.
    With all the important details out of the way, now it’s time to make something great happen! 
    Head back to ThePartyStarter.com, get inspired, and start exploring all the amazing options 
    we’ve made available for you!
    Cheers 🎉
    Your Verification Code is ${verificationCode}
    `,
  }),
  customerEventSubmittal: ({ user }) => ({
    to: user.email,
    from: EMAIL_FROM,
    subject: `ThePartyStarter | Congratulations on your upcomming event!`,
    html: `
    Hi ${user.fullName},
    Excited about your upcoming event? We are too!🎉
    This is why we will leave no stone unturned to make this event a success. Our top 
    vendors are reviewing your event details and will send a quote within 24 hours.🎉
    Once you receive the quotes, review the vendors' portfolios, client reviews, cancellation policies,
    and payment terms. You can also chat with the event vendors on ThePartyStarter's chat 
    platform to provide more details about your event.🎉
    Remember to keep all communication and payment on ThePartyStarter.com's website so that 
    we are able to help you if the need arises. We won’t be responsible for payment transactions or 
    agreements off ThePartyStarter.com. Anything outside our platform is like a galaxy far far away 
    for us.😉  
    We know how important it is to make this event memorable for you and your guests, so feel free
    to review our exclusive online resources such as ThePartyStarter Blog or FAQ’s — designed to 
    help you make your dream event a reality! 
    Cheers 🎉`,
  }),
  customerBooking: ({ user }) => ({
    to: user.email,
    from: EMAIL_FROM,
    subject: `ThePartyStarter | Your Event is BOOKED!`,
    html: `
    Hi ${user.fullName},
    Congratulations on booking your event on ThePartyStarter!🎉
    To remind you again – and we love doing so because we take immense pride in it – our 
    PartyPooper Policy™ guarantees vetted vendors, full refunds for no-shows, and ultra-secure 
    payment options.😇
     
    If you come across any issue or experience any dissatisfaction with your vendor, please reach 
    out to our super-friendly team at hello@thepartystarter.com. Although we undertake a thorough 
    screening of each vendor, we recommend you use your own discretion while choosing a vendor
    at ThePartyStarter.                             
     
    We strongly encourage you to keep your communication and payment on the website so we 
    can assist in case of any conflict. Please note, we don’t keep track of your offline activities and 
    won’t be able to help you with any conflict off the website.🎉
    You can discuss your event details with your vendor on ThePartyStarter.com’s chat platform. 🎉
    Have a fun-packed, momentous event!
    Cheers 🎉`,
  }),
  vendorSignup: ({ user, verificationCode }) => ({
    to: user.email,
    from: EMAIL_FROM,
    subject: `ThePartyStarter | Thank you for signing up🎉`,
    html: `
    Hi ${user.fullName},
    Do you also want to get more client inquiries to grow your business? Get excited, you have 
    signed up on the right platform.🎉
    We are eager to have you on board and showcase your talent to potential clients. But before 
    that, we have to review your portfolio and confirm we are the right combo for this amazing 
    journey. 🎉
    If you meet our criteria of the ideal vendor for our professional and novice event planners, we'll 
    send you a confirmation email within 2-3 weeks. 🎉
    Please note that we have to review thousands of portfolios, so it may take a while to respond. 
    However, keep your hopes high 😊 and check out these portfolio tips in the meantime:
    1. Upload the most recent and relevant photos of your service or talent. 🎉
    2. Indicate whether your business is minority-owned. If so, we will feature your business during 
    key moments (once you are approved as an event vendor).                             
    3. Be honest. Misrepresentation of information provided for review can lead to legal 
    ramifications. ⚖ 

    Your Verification code is ${verificationCode},

    Best of luck. We are eager to kick off our potential partnership with you. 🎉`,
  }),
  vendorApproval: ({ user }) => ({
    to: user.email,
    from: EMAIL_FROM,
    subject: `Welcome to the ThePartyStarter Vendor’s Club! 🎉`,
    html: `
    Hi ${user.fullName},
    Congratulations, you did it! Your business has been approved as a ThePartyStarter vendor.🎉
    What's next?🎉
    1: Keep your portfolio up to date with your latest photos and videos.🎉
    2: Define and chalk out a crystal-clear cancellation policy.🎉
    3: Outline all payment details to eliminate any chance of confusion.🎉
    Please note that ThePartyStarter takes a 15% commission on all booked events. Take this into 
    account when you're providing quotes to event planners. 🎉
    Moreover, ThePartyStarter will release payment 48 hours after your client submits payment 
    according to your terms.🎉
    To ensure we can assist or support you if a conflict arises, <p>please keep all communication 
    and payments on ThePartyStarter.com’s website</p>. We aren't responsible for payment 
    transactions or agreements off ThePartyStarter.com since we don’t troubleshoot offline activity.                
    Now that we have gotten the nitty-gritty out of our way, let's get started! You will start receiving 
    requests from event planners for quotes for your services/talent soon. Encourage your clients to
    submit reviews after their experiences with you to strengthen your credibility and keep the ball 
    rolling on further bookings.⭐
    For additional information, review our FAQ and Terms on ThePartyStarter.com. And once again,
    ALL THE BEST!🎉
    Cheers 🎉`,
  }),
  vendorNonApproval: ({ user }) => ({
    to: user.email,
    from: EMAIL_FROM,
    subject: `Sorry, we are not a good fit at the moment.`,
    html: `
    Hi ${user.fullName},
    Thank you for taking the time to consider ThePartyStarter.
    Our Business Development team has reviewed your profile and determined that your business
    will not advance to the next round as an event vendor for ThePartyStarter.
    In our selection process, we assess event vendors based on several criteria factors —
    relevancy, professionalism, reputation, etc. We wish you the best of luck on your endeavors and
    encourage you to reapply in the future.
    Best,
    ThePartyStarter Team`,
  }),
  vendorReceivingQuotes: ({ user, link }) => ({
    to: user.email,
    from: EMAIL_FROM,
    subject: `ThePartyStarter | You have a new quote!`,
    html: `
    Hi ${user.fullName},
    You just received a request for a quote from a party planner! Check out the quote HERE ${link} 
    and make sure you review the details to submit your best offer. As a reminder, please keep all 
    communication and payments on ThePartyStarter.com’s website. We aren't responsible for
    payment transactions or agreements off ThePartyStarter.com since we don’t troubleshoot offline
    activity.
    Wishing you all the best!
    Cheers 🎉`,
  }),
  vendorBooking: ({ user, event }) => ({
    to: user.email,
    from: EMAIL_FROM,
    subject: `ThePartyStarter | You are booked!✅`,
    html: `
    Hi ${user.fullName},
    Congratulations, another exciting opportunity has come knocking at your door! You are booked 
    for an upcoming event🎉. View the event details below.🎉 Now, it’s time to make memories – not 
    just for your clients but for yourself as well.🎉
    Hop on ThePartyStarter’s chat room if you have any questions or need further clarification about
    the event details for your client.🎉
    With that said, we would like to give you a friendly reminder to keep all communication and 
    payments on ThePartyStarter.com’s website. We aren't responsible for payment transactions
    or agreements off ThePartyStarter.com since we don’t troubleshoot offline activity.⚠ 
    
    Title: ${event.title}
    Description: ${event.description}
    Address: ${event.location.address}

    Wishing you a wonderful event!
    Cheers 🎉`,
  }),
  newsLetter: ({ user }) => ({
    to: user.email,
    from: EMAIL_FROM,
    SUBJECT: `ThePartyStarter | NewsLetter subscription`,
    html: `
    Hi ${user.fullName},
    Thank You For Subscribing`,
  }),
  quickFreeQuote: ({ email, fullName }) => ({
    to: email,
    from: EMAIL_FROM,
    SUBJECT: `ThePartyStarter | Quick Free Quote`,
    html: `
    Hi ${fullName},
    You just received a request for a free quote from a party planner.
    Wishing you all the best!
    Cheers 🎉`,
  }),
};
