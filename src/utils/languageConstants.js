const languageConstants = {
    en: {
        // Search Page
        title: "Search Your Favorite Movies & Shows",
        subtitle:
            "Discover trending titles, classics, and your next binge-watch.",
        search: "Search",
        placeholderText: "What would you like to watch today?",
        emptyMessage:
            "Start typing to search for movies, TV shows, actors, and more.",
        searchSuccess: "Search Results",
        noResults: (query) => `No results found for "${query}"`,

        // Browse Page
        trending: "Trending Now",
        popular: "Popular",
        topRated: "Top Rated",
        upcoming: "Upcoming",

        // Header
        home: "Home",
        shows: "Shows",
        movies: "Movies",
        newPopular: "New & Popular",
        myList: "My List",
        signOutNetflix: "Sign out of Netflix",

        // Footer
        questions: "Questions? Contact us.",
        faq: "FAQ",
        helpCenter: "Help Center",
        account: "Account",
        mediaCenter: "Media Center",
        privacy: "Privacy",
        contactUs: "Contact Us",
        footerTitle: "Netflix Clone By Saugata Das (Frontend Developer)",
        footerSubtitle: "Built for learning purposes only.",
    },

    hindi: {
        // Search Page
        title: "अपनी पसंदीदा फ़िल्में और शो खोजें",
        subtitle:
            "ट्रेंडिंग टाइटल्स, क्लासिक्स और अपना अगला पसंदीदा शो खोजें।",
        search: "खोज",
        placeholderText: "आज आप क्या देखना चाहेंगे?",
        emptyMessage:
            "फ़िल्में, टीवी शो, अभिनेता और बहुत कुछ खोजने के लिए टाइप करना शुरू करें।",
        searchSuccess: "खोज के परिणाम",
        noResults: (query) => `"${query}" के लिए कोई परिणाम नहीं मिला`,

        // Browse Page
        trending: "ट्रेंडिंग",
        popular: "लोकप्रिय",
        topRated: "टॉप रेटेड",
        upcoming: "जल्द आ रहा है",

        // Header
        home: "होम",
        shows: "शो",
        movies: "फ़िल्में",
        newPopular: "नया और लोकप्रिय",
        myList: "मेरी सूची",
        signOutNetflix: "नेटफ्लिक्स से साइन आउट करें",

        // Footer
        questions: "कोई सवाल है? हमसे संपर्क करें।",
        faq: "सामान्य प्रश्न",
        helpCenter: "सहायता केंद्र",
        account: "खाता",
        mediaCenter: "मीडिया सेंटर",
        privacy: "गोपनीयता",
        contactUs: "संपर्क करें",
        footerTitle: "सौगत दास द्वारा नेटफ्लिक्स क्लोन ( फ्रंटएंड डेवलपर )",
        footerSubtitle: "केवल सीखने के उद्देश्य से बनाया गया है।",
    },

    bengali: {
        // Search Page
        title: "আপনার প্রিয় সিনেমা ও শো খুঁজুন",
        subtitle:
            "ট্রেন্ডিং টাইটেল, ক্লাসিকস এবং আপনার পরের পছন্দের শো খুঁজে নিন।",
        search: "খুঁজুন",
        placeholderText: "আজ আপনি কী দেখতে চান?",
        emptyMessage:
            "সিনেমা, টিভি শো, অভিনেতা এবং আরও অনেক কিছু খুঁজতে টাইপ করা শুরু করুন।",
        searchSuccess: "অনুসন্ধান ফলাফল",
        noResults: (query) => `"${query}" এর জন্য কোনো ফলাফল পাওয়া যায়নি`,

        // Browse Page
        trending: "ট্রেন্ডিং",
        popular: "জনপ্রিয়",
        topRated: "সর্বোচ্চ রেটেড",
        upcoming: "শীঘ্রই আসছে",

        // Header
        home: "হোম",
        shows: "শো",
        movies: "সিনেমা",
        newPopular: "নতুন ও জনপ্রিয়",
        myList: "আমার তালিকা",
        signOutNetflix: "নেটফ্লিক্স থেকে সাইন আউট করুন",

        // Footer
        questions: "প্রশ্ন আছে? আমাদের সাথে যোগাযোগ করুন।",
        faq: "প্রশ্নোত্তর",
        helpCenter: "সহায়তা কেন্দ্র",
        account: "অ্যাকাউন্ট",
        mediaCenter: "মিডিয়া সেন্টার",
        privacy: "গোপনীয়তা",
        contactUs: "যোগাযোগ করুন",
        footerTitle: "সৌগত দাসের তৈরি নেটফ্লিক্স ক্লোন ( ফ্রন্টএন্ড ডেভেলপার )",
        footerSubtitle: "শুধুমাত্র শেখার উদ্দেশ্যে তৈরি।",
    },
};

export default languageConstants;