// ========== TRANSLATION SYSTEM ==========
const translations = {
    en: {
        // Nav
        nav_home: 'HOME',
        nav_products: 'PRODUCTS',
        nav_about: 'ABOUT US',
        nav_contact: 'CONTACT US',
        nav_login: 'LOGIN',
        nav_logout: 'LOG OUT',
        order_medicine: 'Order this medicine',
        login_title: 'Login with your phone',
        login_description: 'We will send a one-time code by SMS.',
        login_phone_label: 'Phone number',
        login_send_code: 'Send OTP',
        login_otp_label: 'Enter the SMS code',
        login_verify: 'Verify and login',
        form_medicine_label: 'Select Medicine',

        // Header
        header_logo: '🐾 Henivet Pharma',
        header_tagline: 'Natural Homeopathic Care for Your Livestock',
        header_call: '📞 Call Now',
        header_whatsapp: '💬 WhatsApp',
        header_email: '📩 Email',

        // Hero Banner
        hero_title: 'Healthy Animals, Happy Farmers',
        hero_desc1: 'We provide safe and effective homeopathic medicines for cows, buffalo, and goats.',
        hero_desc2: 'Our medicines help improve health, increase milk production, and treat common diseases naturally.',
        hero_call: '📞 Call Now',
        hero_whatsapp: '💬 WhatsApp Us',
        hero_email: '📩 Email Us',

        // Why Choose Us
        why_title: 'Why Choose Henivet Pharma?',
        why_1_title: '100% Homeopathic & Safe',
        why_1_desc: 'All medicines are natural and safe for your animals.',
        why_2_title: 'No Side Effects',
        why_2_desc: 'Pure homeopathic formulations with zero harmful chemicals.',
        why_3_title: 'Affordable Treatment',
        why_3_desc: 'Cost-effective solutions for farmer-friendly prices.',
        why_4_title: 'Experienced Guidance',
        why_4_desc: 'Expert advice from experienced animal care professionals.',
        why_5_title: 'Trusted by Farmers',
        why_5_desc: 'Thousands of satisfied farmers across the region.',
        why_6_title: 'Quick Services',
        why_6_desc: 'Fast response and quick order delivery.',

        // Services
        services_title: 'Our Services',
        services_1: 'Fever Treatment',
        services_2: 'Digestion Problems',
        services_3: 'Milk Production Improvement',
        services_4: 'Weakness & Recovery',
        services_5: 'General Health Care',

        // Gallery Section
        gallery_title: 'Our Medicines Gallery',

        // Products
        products_title: 'Products',
        product_1_name: 'Milk Booster Drops',
        product_1_desc: 'Improves milk production in cows and buffalo. Helps in increasing strength and overall health.',
        product_2_name: 'Fever Relief Medicine',
        product_2_desc: 'Effective treatment for fever and infections in animals. Works quickly and safely.',
        product_3_name: 'Digestion Tonic',
        product_3_desc: 'Used for indigestion, gas, and stomach problems. Improves appetite and digestion.',
        product_4_name: 'General Health Tonic',
        product_4_desc: 'Boosts immunity and overall health of animals. Suitable for cows, buffalo, and goats.',
        order_call: '📞 Call to Order',
        order_whatsapp: '💬 WhatsApp to Order',

        // About
        about_title: 'About Henivet Pharma',
        about_desc1: 'Henivet Pharma is dedicated to providing high-quality homeopathic medicines for animals.',
        about_desc2: 'With years of experience in animal care, we focus on natural and safe treatment methods for cows, buffalo, and goats. Our goal is to help farmers maintain healthy livestock without harmful chemicals.',
        about_desc3: 'We believe that healthy animals lead to better productivity and a better life for farmers.',

        // Reviews
        reviews_title: 'What Our Customers Say',
        review_1_text: '"My cow recovered from fever within 2 days. Very effective medicine."',
        review_1_author: '- Farmer Rajesh',
        review_2_text: '"Milk production increased after using their medicine. Highly recommended."',
        review_2_author: '- Farmer Vikram',
        review_3_text: '"Affordable and safe treatment for animals. Good service."',
        review_3_author: '- Farmer Suresh',
        review_button: 'Write a Review',
        review_name_placeholder: 'Your Name',
        review_message_placeholder: 'Write your review',
        review_submit: 'Submit Review',

        // Contact
        contact_title: 'Contact Us / Order Medicine',
        contact_subtitle: 'To order medicine or get advice, contact us directly.',
        contact_phone_title: '📞 Phone',
        contact_phone: 'Call: +91-9889501444',
        contact_whatsapp_title: '💬 WhatsApp',
        contact_whatsapp: 'WhatsApp: +91 9889501444',
        contact_email_title: '📩 Email',
        contact_email: 'henivetpharma@gmail.com',
        contact_form_title: 'Send us a Message',
        form_name_placeholder: 'Your Name',
        form_phone_placeholder: 'Phone Number',
        form_animal_label: 'Select Animal Type',
        form_animal_cow: 'Cow',
        form_animal_buffalo: 'Buffalo',
        form_animal_goat: 'Goat',
        form_problem_placeholder: 'Problem / बीमारी',
        form_submit: '👉 Submit & We Will Contact You',

        // Footer
        footer_brand: '🐾 Henivet Pharma',
        footer_tagline: 'Natural Animal Homeopathy',
        footer_contact_title: '📞 Contact Info',
        footer_phone: 'Phone: +91-9889501444',
        footer_email: 'Email: henivetpharma@gmail.com',
        footer_whatsapp_link: '💬 Follow us on WhatsApp',
        footer_serve_title: '🐄 We Serve',
        footer_serve_1: 'Cow Care',
        footer_serve_2: 'Buffalo Care',
        footer_serve_3: 'Goat Care',
        footer_animals_title: '📌 Animal Types',
        footer_animal_1: 'Cows',
        footer_animal_2: 'Buffalo',
        footer_animal_3: 'Goats',
        footer_copyright: '&copy; 2026 Henivet Pharma - Natural Homeopathic Medicine for Livestock. All Rights Reserved.',

        // Alert
        alert_whatsapp: 'Thank you! Your message will be sent to WhatsApp. We will contact you soon!',

        // Gallery Medicine Names
        medicine_actino: 'Actinobacillosis Treatment',
        medicine_actino_desc: 'Effective homeopathic remedy for actinobacillosis (lumpy jaw) in cattle.',
        medicine_cough: 'Cough & Respiratory Care',
        medicine_cough_desc: 'Provides relief from cough, cold, and respiratory infections in livestock.',
        medicine_diarrhoea: 'Diarrhoea Treatment',
        medicine_diarrhoea_desc: 'Natural remedy for diarrhoea and digestive tract infections in animals.',
        medicine_ferit: 'Fertility Booster',
        medicine_ferit_desc: 'Enhances fertility and reproductive health in cows and buffalo.',
        medicine_fever: 'Fever Relief',
        medicine_fever_desc: 'Quick and safe relief from fever and associated symptoms.',
        medicine_fibro: 'Fibroma Treatment',
        medicine_fibro_desc: 'Homeopathic treatment for fibroma and skin growths in animals.',
        medicine_heatress: 'Heat Stress Relief',
        medicine_heatress_desc: 'Helps animals cope with heat stress and maintains productivity.',
        medicine_infertility: 'Infertility & Repeater (A.I.) Treatment',
        medicine_infertility_desc: 'Treats infertility issues and improves A.I. success rates.',
        medicine_liver: 'Liver Tonic',
        medicine_liver_desc: 'Supports liver function and detoxification in livestock.',
        medicine_masti: 'Mastitis Treatment',
        medicine_masti_desc: 'Effective remedy for mastitis and udder health issues.',
        medicine_milking: 'Milking Support',
        medicine_milking_desc: 'Promotes healthy milk let-down and udder comfort.',
        medicine_prega: 'Pregnancy Care',
        medicine_prega_desc: 'Supports healthy pregnancy and reduces complications during calving.',
        medicine_pro: 'Prolapse & Weakness',
        medicine_pro_desc: 'Helps in prevention and management of prolapse and general weakness.',
        medicine_prolapse: 'Prolapse Treatment',
        medicine_prolapse_desc: 'Homeopathic treatment for vaginal and uterine prolapse.',
        medicine_sarra: 'Sarra Treatment',
        medicine_sarra_desc: 'Effective remedy for sarra (surra) disease in livestock.',
        medicine_skin: 'Skin Disease Treatment',
        medicine_skin_desc: 'Treats various skin conditions and infections in animals.',
        medicine_uterus: 'Uterus Health',
        medicine_uterus_desc: 'Promotes uterine health and normal reproductive function.',
    },

    hi: {
        // Nav
        nav_home: 'होम',
        nav_products: 'उत्पाद',
        nav_about: 'हमारे बारे में',
        nav_contact: 'संपर्क करें',
        nav_login: 'लॉगिन',
        nav_logout: 'लॉगआउट',
        order_medicine: 'यह दवा ऑर्डर करें',
        login_title: 'फोन से लॉगिन करें',
        login_description: 'हम SMS से एक बार इस्तेमाल होने वाला कोड भेजेंगे।',
        login_phone_label: 'फोन नंबर',
        login_send_code: 'OTP भेजें',
        login_otp_label: 'SMS कोड दर्ज करें',
        login_verify: 'सत्यापित करें और लॉगिन करें',
        form_medicine_label: 'दवा चुनें',

        // Header
        header_logo: '🐾 हेनिवेट फार्मा',
        header_tagline: 'आपके पशुओं के लिए प्राकृतिक होम्योपैथिक देखभाल',
        header_call: '📞 अभी कॉल करें',
        header_whatsapp: '💬 व्हाट्सएप',
        header_email: '📩 ईमेल',

        // Hero Banner
        hero_title: 'स्वस्थ पशु, खुश किसान',
        hero_desc1: 'हम गाय, भैंस और बकरियों के लिए सुरक्षित और प्रभावी होम्योपैथिक दवाएं प्रदान करते हैं।',
        hero_desc2: 'हमारी दवाएं स्वास्थ्य में सुधार, दूध उत्पादन बढ़ाने और सामान्य बीमारियों का प्राकृतिक रूप से इलाज करने में मदद करती हैं।',
        hero_call: '📞 अभी कॉल करें',
        hero_whatsapp: '💬 व्हाट्सएप करें',
        hero_email: '📩 ईमेल करें',

        // Why Choose Us
        why_title: 'हेनिवेट फार्मा को क्यों चुनें?',
        why_1_title: '100% होम्योपैथिक और सुरक्षित',
        why_1_desc: 'सभी दवाएं आपके जानवरों के लिए प्राकृतिक और सुरक्षित हैं।',
        why_2_title: 'कोई साइड इफेक्ट नहीं',
        why_2_desc: 'शुद्ध होम्योपैथिक फॉर्मूलेशन, शून्य हानिकारक रसायन।',
        why_3_title: 'किफायती इलाज',
        why_3_desc: 'किसानों के अनुकूल कीमतों पर लागत प्रभावी समाधान।',
        why_4_title: 'अनुभवी मार्गदर्शन',
        why_4_desc: 'अनुभवी पशु देखभाल पेशेवरों से विशेषज्ञ सलाह।',
        why_5_title: 'किसानों द्वारा विश्वसनीय',
        why_5_desc: 'पूरे क्षेत्र में हजारों संतुष्ट किसान।',
        why_6_title: 'त्वरित सेवाएं',
        why_6_desc: 'तेज प्रतिक्रिया और त्वरित ऑर्डर डिलीवरी।',

        // Services
        services_title: 'हमारी सेवाएं',
        services_1: 'बुखार का इलाज',
        services_2: 'पाचन समस्याएं',
        services_3: 'दूध उत्पादन में सुधार',
        services_4: 'कमजोरी और रिकवरी',
        services_5: 'सामान्य स्वास्थ्य देखभाल',

        // Gallery Section
        gallery_title: 'हमारी दवाओं की गैलरी',

        // Products
        products_title: 'उत्पाद',
        product_1_name: 'दूध बूस्टर ड्रॉप्स',
        product_1_desc: 'गाय और भैंस में दूध उत्पादन में सुधार करता है। ताकत और समग्र स्वास्थ्य बढ़ाने में मदद करता है।',
        product_2_name: 'बुखार राहत दवा',
        product_2_desc: 'जानवरों में बुखार और संक्रमण के लिए प्रभावी उपचार। जल्दी और सुरक्षित काम करता है।',
        product_3_name: 'पाचन टॉनिक',
        product_3_desc: 'अपच, गैस और पेट की समस्याओं के लिए उपयोग किया जाता है। भूख और पाचन में सुधार करता है।',
        product_4_name: 'सामान्य स्वास्थ्य टॉनिक',
        product_4_desc: 'जानवरों की रोग प्रतिरोधक क्षमता और समग्र स्वास्थ्य को बढ़ाता है। गाय, भैंस और बकरियों के लिए उपयुक्त।',
        order_call: '📞 ऑर्डर करने के लिए कॉल करें',
        order_whatsapp: '💬 ऑर्डर करने के लिए व्हाट्सएप करें',

        // About
        about_title: 'हेनिवेट फार्मा के बारे में',
        about_desc1: 'हेनिवेट फार्मा जानवरों के लिए उच्च गुणवत्ता वाली होम्योपैथिक दवाएं प्रदान करने के लिए समर्पित है।',
        about_desc2: 'पशु देखभाल में वर्षों के अनुभव के साथ, हम गाय, भैंस और बकरियों के लिए प्राकृतिक और सुरक्षित उपचार विधियों पर ध्यान केंद्रित करते हैं। हमारा लक्ष्य किसानों को हानिकारक रसायनों के बिना स्वस्थ पशुधन बनाए रखने में मदद करना है।',
        about_desc3: 'हम मानते हैं कि स्वस्थ जानवर बेहतर उत्पादकता और किसानों के लिए बेहतर जीवन की ओर ले जाते हैं।',

        // Reviews
        reviews_title: 'हमारे ग्राहक क्या कहते हैं',
        review_1_text: '"मेरी गाय 2 दिनों में बुखार से ठीक हो गई। बहुत प्रभावी दवा।"',
        review_1_author: '- किसान राजेश',
        review_2_text: '"उनकी दवा का उपयोग करने के बाद दूध उत्पादन बढ़ गया। अत्यधिक अनुशंसित।"',
        review_2_author: '- किसान विक्रम',
        review_3_text: '"जानवरों के लिए किफायती और सुरक्षित इलाज। अच्छी सेवा।"',
        review_3_author: '- किसान सुरेश',
        review_button: 'समीक्षा लिखें',
        review_name_placeholder: 'आपका नाम',
        review_message_placeholder: 'अपनी समीक्षा लिखें',
        review_submit: 'समीक्षा भेजें',

        // Contact
        contact_title: 'संपर्क करें / दवा ऑर्डर करें',
        contact_subtitle: 'दवा ऑर्डर करने या सलाह लेने के लिए सीधे हमसे संपर्क करें।',
        contact_phone_title: '📞 फोन',
        contact_phone: 'कॉल करें: +91-9889501444',
        contact_whatsapp_title: '💬 व्हाट्सएप',
        contact_whatsapp: 'व्हाट्सएप: +91 9889501444',
        contact_email_title: '📩 ईमेल',
        contact_email: 'henivetpharma@gmail.com',
        contact_form_title: 'हमें संदेश भेजें',
        form_name_placeholder: 'आपका नाम',
        form_phone_placeholder: 'फोन नंबर',
        form_animal_label: 'पशु का प्रकार चुनें',
        form_animal_cow: 'गाय',
        form_animal_buffalo: 'भैंस',
        form_animal_goat: 'बकरी',
        form_problem_placeholder: 'Problem / बीमारी',
        form_submit: '👉 सबमिट करें और हम आपसे संपर्क करेंगे',

        // Footer
        footer_brand: '🐾 हेनिवेट फार्मा',
        footer_tagline: 'प्राकृतिक पशु होम्योपैथी',
        footer_contact_title: '📞 संपर्क जानकारी',
        footer_phone: 'फोन: +91-9889501444',
        footer_email: 'ईमेल: henivetpharma@gmail.com',
        footer_whatsapp_link: '💬 व्हाट्सएप पर फॉलो करें',
        footer_serve_title: '🐄 हम सेवा करते हैं',
        footer_serve_1: 'गाय देखभाल',
        footer_serve_2: 'भैंस देखभाल',
        footer_serve_3: 'बकरी देखभाल',
        footer_animals_title: '📌 पशु प्रकार',
        footer_animal_1: 'गाय',
        footer_animal_2: 'भैंस',
        footer_animal_3: 'बकरी',
        footer_copyright: '&copy; 2026 हेनिवेट फार्मा - पशुओं के लिए प्राकृतिक होम्योपैथिक दवा। सर्वाधिकार सुरक्षित।',

        // Alert
        alert_whatsapp: 'धन्यवाद! आपका संदेश व्हाट्सएप पर भेज दिया जाएगा। हम जल्द ही आपसे संपर्क करेंगे!',

        // Gallery Medicine Names
        medicine_actino: 'एक्टिनोबैसिलोसिस उपचार',
        medicine_actino_desc: 'मवेशियों में एक्टिनोबैसिलोसिस (लंपी जॉ) के लिए प्रभावी होम्योपैथिक उपचार।',
        medicine_cough: 'खांसी और श्वसन देखभाल',
        medicine_cough_desc: 'पशुओं में खांसी, सर्दी और श्वसन संक्रमण से राहत प्रदान करता है।',
        medicine_diarrhoea: 'दस्त उपचार',
        medicine_diarrhoea_desc: 'जानवरों में दस्त और पाचन तंत्र संक्रमण के लिए प्राकृतिक उपचार।',
        medicine_ferit: 'प्रजनन क्षमता बढ़ाने वाला',
        medicine_ferit_desc: 'गाय और भैंस में प्रजनन क्षमता और प्रजनन स्वास्थ्य को बढ़ाता है।',
        medicine_fever: 'बुखार से राहत',
        medicine_fever_desc: 'बुखार और संबंधित लक्षणों से त्वरित और सुरक्षित राहत।',
        medicine_fibro: 'फाइब्रोमा उपचार',
        medicine_fibro_desc: 'जानवरों में फाइब्रोमा और त्वचा वृद्धि के लिए होम्योपैथिक उपचार।',
        medicine_heatress: 'गर्मी के तनाव से राहत',
        medicine_heatress_desc: 'जानवरों को गर्मी के तनाव से निपटने और उत्पादकता बनाए रखने में मदद करता है।',
        medicine_infertility: 'बांझपन और रिपीटर (ए.आई.) उपचार',
        medicine_infertility_desc: 'बांझपन की समस्याओं का इलाज करता है और ए.आई. सफलता दर में सुधार करता है।',
        medicine_liver: 'लिवर टॉनिक',
        medicine_liver_desc: 'पशुओं में लिवर कार्य और विषहरण में सहायता करता है।',
        medicine_masti: 'मास्टिटिस उपचार',
        medicine_masti_desc: 'मास्टिटिस और थन स्वास्थ्य समस्याओं के लिए प्रभावी उपचार।',
        medicine_milking: 'दुहने में सहायक',
        medicine_milking_desc: 'स्वस्थ दूध निकासी और थन आराम को बढ़ावा देता है।',
        medicine_prega: 'गर्भावस्था देखभाल',
        medicine_prega_desc: 'स्वस्थ गर्भावस्था का समर्थन करता है और प्रसव के दौरान जटिलताओं को कम करता है।',
        medicine_pro: 'प्रोलैप्स और कमजोरी',
        medicine_pro_desc: 'प्रोलैप्स और सामान्य कमजोरी की रोकथाम और प्रबंधन में मदद करता है।',
        medicine_prolapse: 'प्रोलैप्स उपचार',
        medicine_prolapse_desc: 'योनि और गर्भाशय प्रोलैप्स के लिए होम्योपैथिक उपचार।',
        medicine_sarra: 'सर्रा उपचार',
        medicine_sarra_desc: 'पशुओं में सर्रा (सुर्रा) रोग के लिए प्रभावी उपचार।',
        medicine_skin: 'त्वचा रोग उपचार',
        medicine_skin_desc: 'जानवरों में विभिन्न त्वचा स्थितियों और संक्रमणों का इलाज करता है।',
        medicine_uterus: 'गर्भाशय स्वास्थ्य',
        medicine_uterus_desc: 'गर्भाशय स्वास्थ्य और सामान्य प्रजनन कार्य को बढ़ावा देता है।',
    }
};

let currentLang = 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('henivet_lang', lang);
    document.documentElement.lang = lang;

    // Update all elements with data-lang attribute
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key] !== undefined) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else if (el.tagName === 'SELECT') {
                // Handle select options separately
            } else {
                el.innerHTML = translations[lang][key];
            }
        }
    });

    // Update select options
    const animalSelect = document.getElementById('animal');
    if (animalSelect) {
        const options = animalSelect.options;
        if (options.length >= 4) {
            options[0].text = translations[lang].form_animal_label;
            options[1].text = translations[lang].form_animal_cow;
            options[2].text = translations[lang].form_animal_buffalo;
            options[3].text = translations[lang].form_animal_goat;
        }
    }

    // Update language toggle button text
    const langToggle = document.querySelector('.lang-toggle-btn');
    if (langToggle) {
        langToggle.innerHTML = lang === 'en' ? '🇮🇳 हिन्दी' : '🇬🇧 English';
    }

    // Close dropdown
    const dropdown = document.querySelector('.lang-dropdown');
    if (dropdown) {
        dropdown.classList.remove('show');
    }
    document.dispatchEvent(new Event('languagechange'));
}

function toggleLangDropdown() {
    const dropdown = document.querySelector('.lang-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

// Close language dropdown when clicking outside
document.addEventListener('click', function(e) {
    const langSwitcher = document.querySelector('.lang-switcher');
    if (langSwitcher && !langSwitcher.contains(e.target)) {
        const dropdown = document.querySelector('.lang-dropdown');
        if (dropdown) {
            dropdown.classList.remove('show');
        }
    }
});

// ========== CONTACT FORM ==========
function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const animal = document.getElementById('animal').value;
    const problem = document.getElementById('problem').value;
    
    // Create WhatsApp message
    const message = `Hello Henivet Pharma!\n\nName: ${name}\nPhone: ${phone}\nAnimal Type: ${animal}\nProblem: ${problem}`;
    const whatsappUrl = `https://wa.me/919889501444?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    event.target.reset();
    
    // Show confirmation
    const alertMsg = translations[currentLang].alert_whatsapp;
    alert(alertMsg);
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', function() {
    // Load saved language
    const savedLang = localStorage.getItem('henivet_lang') || 'en';
    setLanguage(savedLang);

    const medicineSelect = document.getElementById('medicine');
    document.querySelectorAll('.medicine-card').forEach(card => {
        const medicineName = card.querySelector('h3')?.textContent.trim();
        if (!medicineName) return;

        const option = document.createElement('option');
        option.value = medicineName;
        option.textContent = medicineName;
        medicineSelect.append(option);

        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-haspopup', 'dialog');
    });

    const reviewToggle = document.getElementById('review-toggle');
    const reviewForm = document.getElementById('review-form');
    const reviewsGrid = document.querySelector('.reviews-grid');
    const savedReviews = [];

    reviewToggle.addEventListener('click', function() {
        reviewForm.hidden = !reviewForm.hidden;
        reviewToggle.setAttribute('aria-expanded', String(!reviewForm.hidden));
        if (!reviewForm.hidden) {
            document.getElementById('review-name').focus();
        }
    });

    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const review = {
            name: document.getElementById('review-name').value.trim(),
            rating: Number(document.getElementById('review-rating').value),
            message: document.getElementById('review-message').value.trim()
        };
        if (!review.name || !review.message) return;

        document.dispatchEvent(new CustomEvent('henivet:review-submit', { detail: review }));
    });
    
    console.log('Henivet Pharma website loaded successfully!');
});

function addCustomerReview(review, reviewsGrid) {
    const card = document.createElement('article');
    card.className = 'review-card';

    const stars = document.createElement('div');
    stars.className = 'review-stars';
    for (let starIndex = 0; starIndex < 5; starIndex += 1) {
        const star = document.createElement('span');
        star.textContent = '⭐';
        if (starIndex >= review.rating) star.className = 'review-stars-empty';
        stars.append(star);
    }

    const message = document.createElement('p');
    message.className = 'review-text';
    message.textContent = `"${review.message}"`;

    const author = document.createElement('p');
    author.className = 'review-author';
    author.textContent = `- ${review.name}`;

    card.append(stars, message, author);
    reviewsGrid.append(card);
}

