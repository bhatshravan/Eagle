import React, { useState } from "react";
import { useApiCall } from "../Utils/api";
import { Link } from "react-router-dom";
import { Modal, Button, Group } from "@mantine/core";

export default function News() {
  const [opened, setOpened] = useState(false);
  const [modalData, setModalData] = useState("");
  const newsQuery = useApiCall(
    "news",
    "get",
    // "https://newsapi.org/v2/top-headlines?country=in&apiKey=45bb840c98934815a19ec6784fc50a19&category=business&pageSize=70"
    // "https://vtu.bitstreak.in/papers/subject/PHYSICS_CYCLE/2018/1"
    "https://trade.bitstreak.in/news"
  );

  if (newsQuery.isLoading) {
    return (
      <div className="text-center mt-20">
        <svg
          role="status"
          className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }
  return (
    <>
      <Modal
        overflow="inside"
        centered
        size="xl"
        opened={opened}
        onClose={() => setOpened(false)}
        title="Article!">
        <div className="p-6 space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          {modalData}
          </p>
         
        </div>
      </Modal>
      <div className="container flex flex-col items-center justify-center">
        <div className="col">
          {newsQuery.data &&
            newsQuery.data.articles.map((article) => (
              <div className="row   items-center justify-center">
                <div className="p-6 sm:w-4/6 lg:w-2/3 my-5 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {article.title}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {article.description}
                  </p>
                  <a 
                    href={article.url} target="_blank"
                    className="inline-flex mr-2 items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg
                      className="ml-2 -mr-1 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                    </svg>
                  </a>
                  {/* <Button variant="outline" onClick={() => {setModalData(article.content || "");setOpened(true)}}>
                    Full article
                  </Button> */}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
