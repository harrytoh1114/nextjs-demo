import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const HomePage = (props) => {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);
  // useEffect(() => {

  //     setLoadedMeetups(dummy);
  // },[]);

  return (
    <>
      <Head>
        <title>Next JS Tutorial</title>
        <meta name='description' content='List of meetups'></meta>
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://admin:to4fr3nflvSSFkfp@cluster0.dugva.mongodb.net/meetup?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupCollections = db.collection("meetups");

  const meetup = await meetupCollections.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetup.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: dummy
//         }
//     }
// }

export default HomePage;
