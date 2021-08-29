import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
const MeetupDetailPage = (props) => {
  console.log(props.detail);
  return (
    <>
      <Head>
        <title>{props.detail.title}</title>
        <meta name="description" content={props.detail.description}></meta>
      </Head>
      <MeetupDetail
        image={props.detail.image}
        title={props.detail.title}
        address={props.detail.address}
        description={props.detail.description}
      ></MeetupDetail>
    </>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://admin:to4fr3nflvSSFkfp@cluster0.dugva.mongodb.net/meetup?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupCollections = db.collection("meetups");

  const meetups = await meetupCollections.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const id = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://admin:to4fr3nflvSSFkfp@cluster0.dugva.mongodb.net/meetup?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupCollections = db.collection("meetups");

  const meetups = await meetupCollections.findOne({ _id: ObjectId(id) });

  client.close();
  console.log(meetups);
  return {
    props: {
      detail: {
        id: meetups._id.toString(),
        title: meetups.title,
        image: meetups.image,
        address: meetups.address,
        descriptuon: meetups.description,
      },
    },
  };
}

export default MeetupDetailPage;
