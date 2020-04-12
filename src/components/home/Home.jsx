import React, { useState, useEffect } from "react";
import PostFormulary from "../elements/PostFormulary";
import ConfessionCard from "../confessions/ConfessionCard";
import { firestore } from "firebase";

const Home = () => {
  // lista de confesiones/posts
  const [listprops, setListProps] = useState();
  //todos los comentarios para filtrar en los posts
  const [comments, setComments] = useState();

  // actualiza los post en tiempo real desde firestore y sanea el efecto cortando la promesa si el componente se desmonta
  useEffect(() => {
    let comentlist = [];

    const HandlePosts = firestore()
      .collection("confesiones")
      .orderBy("date", "desc")
      .onSnapshot(snapshot => {
        const everypost = snapshot.docs.map(doc => ({
          ...doc.data()
        }));

        setListProps(everypost);
      });

    const HandleComments = firestore()
      .collection("comentarios")
      .onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          const data = doc.data();
          comentlist.push(data);
        });
        setComments(comentlist);
      });
    comentlist = [];
    return () => {
      HandlePosts();
      HandleComments();
    };
  }, []);

  return (
    <div>
      <h3 className="form-tittle header-top">Confesiones anónimas</h3>
      <div className="posts-Container ">
        {/* comprobar que ambos campos estan rellenos antes de crear la lista de posts */}
        {listprops &&
          comments &&
          listprops.map((item, idx) => (
            <ConfessionCard key={idx} data={item} comments={comments} />
          ))}
      </div>
      <PostFormulary />
    </div>
  );
};

export default Home;
