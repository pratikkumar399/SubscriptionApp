// addPlansToFirestore.js
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase'; // Adjust the import path based on your file structure

const plansData = {
    "plans": [
        {
            "name": "Basic",
            "monthly_price": "100 INR",
            "yearly_price": "1000 INR",
            "video_quality": "Good",
            "resolution": "480p",
            "devices_allowed": ["Phone"],
            "active_screens": 1
        },
        {
            "name": "Standard",
            "monthly_price": "200 INR",
            "yearly_price": "2000 INR",
            "video_quality": "Good",
            "resolution": "720P",
            "devices_allowed": ["Phone", "Tablet"],
            "active_screens": 3
        },
        {
            "name": "Premium",
            "monthly_price": "500 INR",
            "yearly_price": "5000 INR",
            "video_quality": "Better",
            "resolution": "1080P",
            "devices_allowed": ["Phone", "Tablet", "Computer"],
            "active_screens": 5
        },
        {
            "name": "Regular",
            "monthly_price": "700 INR",
            "yearly_price": "7000 INR",
            "video_quality": "Best",
            "resolution": "4K+HDR",
            "devices_allowed": ["Phone", "Tablet", "TV"],
            "active_screens": 10
        }
    ]
};


const addPlansToFirestore = async () => {
    try {
        const plansCollectionRef = collection(db, 'plans');
        await addDoc(plansCollectionRef, plansData);
        console.log('Plans data added to Firestore successfully!');
    } catch (error) {
        console.error('Error adding plans data to Firestore: ', error);
    }
};

export default addPlansToFirestore;
