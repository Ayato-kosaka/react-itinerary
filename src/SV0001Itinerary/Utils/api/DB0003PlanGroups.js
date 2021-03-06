import * as HK0001Utils from 'SV0000Common/Hooks/HK0001Utils'
import db from '../fireB/firestore'
import { doc, collection, getDocs, setDoc, addDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import * as DB0002Itineraries from 'SV0001Itinerary/Utils/api/DB0002Itineraries';


const collectionName = 'PlanGroups';
const parentCollection = collection(db, DB0002Itineraries.collectionName)
const collectionRef = (itineraryId) => collection(parentCollection, itineraryId, collectionName)

const dataHash = (id, itineraryId, data) =>{
    if(!id){ return }
    return({
        'id': id,
        'itineraryId': itineraryId,
        ...bodyHash(data)
    });
}

const bodyHash = (data) => {
    return({
        'plans': Array.isArray(data.plans) ? data.plans : (data.plans ? data.plans.split(',') : []),
        'representivePlanID': data.representivePlanID || '',
        'representiveStartTime': (data.representiveStartTime instanceof Date) ? data.representiveStartTime : ( data.representiveStartTime ? data.representiveStartTime.toDate() : HK0001Utils.initialDate() ),
    });
}




export const readAll = async (itineraryId) => {
    const querySnapshot = await getDocs(query(collectionRef(itineraryId), orderBy('representiveStartTime')));
    return (querySnapshot.docs.map((doc) =>
        dataHash(doc.id, itineraryId, doc.data())
    ));
}

export const create = async (itineraryId) => {
    let docRef = await addDoc(collectionRef(itineraryId), bodyHash({}));
    return(dataHash(docRef.id, itineraryId, {}));
}

export const update = async (data) => {
    const setterConverter = (x) => ({...x, 'plans': x.plans.join()});
    await setDoc(doc(collectionRef(data.itineraryId), data.id), setterConverter(bodyHash(data)), { merge: true });
}

export const deleteData = async (data) =>{
    await deleteDoc(doc(collectionRef(data.itineraryId), data.id));
}