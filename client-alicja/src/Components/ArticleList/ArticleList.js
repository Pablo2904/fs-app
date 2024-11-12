import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import {
  List,
  WindowScroller,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";

export const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [totalArticles, setTotalArticles] = useState(0);

  const PAGE_SIZE = 4;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/articles?start=${startIndex}&limit=${PAGE_SIZE}`
        );

        if (response.data) {
          if (startIndex === 0) {
            setArticles(response.data);
          } else {
            setArticles((prevArticles) => [...prevArticles, ...response.data]);
          }
          setTotalArticles(response.data.total);
        } else {
          console.error("Response data is not the expected format");
        }
      } catch (error) {
        console.error("Error fetching articles: ", error);
      }
    };

    fetchArticles();
  }, [startIndex]);

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100, // Wysokość domyślna dla wierszy, jeśli nie można określić rzeczywistej wysokości
  });

  const renderRow = ({ index, key, parent, style }) => {
    const article = articles[index];

    return (
      <CellMeasurer
        cache={cache}
        key={key}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div style={style}>
          {article && (
            <>
              <div>Title: {article.title}</div>
              <div>Content: {article.content}</div>
              <div>Author: {article.author}</div>
              <div>
                Date: {dayjs(article.created_at).format("DD/MM/YYYY HH:mm:ss")}
              </div>
            </>
          )}
        </div>
      </CellMeasurer>
    );
  };

  const handleScroll = ({ scrollTop }) => {
    if (
      scrollTop + window.innerHeight >=
      document.documentElement.scrollHeight - 100
    ) {
      if (startIndex + PAGE_SIZE < totalArticles) {
        setStartIndex((prevIndex) => prevIndex + PAGE_SIZE);
      }
    }
  };

  return (
    <div>
      <h2>Articles</h2>
      <WindowScroller>
        {({ height, isScrolling, scrollTop }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                width={300}
                height={height}
                rowCount={articles.length}
                isScrolling={isScrolling}
                rowHeight={cache.rowHeight}
                rowRenderer={renderRow}
                scrollTop={scrollTop}
                autoHeight
                onScroll={handleScroll}
              />
            )}
          </AutoSizer>
        )}
      </WindowScroller>
    </div>
  );
};
//WCZEŚNIEJSZY************************************************
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import dayjs from "dayjs";
// import { List, WindowScroller, AutoSizer } from "react-virtualized";

// //liczba artykułów pobierana przy każdym żądaniu
// const PAGE_SIZE = 6;

// export const ArticleList = () => {
//   const [articles, setArticles] = useState([]);
//   const [startIndex, setStartIndex] = useState(0); //startIndex = indeks, od którego zaczyna się pobieranie artykułów
//   const [totalArticles, setTotalArticles] = useState(0);

//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/articles?start=${startIndex}&limit=${PAGE_SIZE}`
//         );

//         if (response.data) {
//           setArticles((prevArticles) => [...prevArticles, ...response.data]);
//           setTotalArticles(response.data.total);
//         } else {
//           console.error("Response data is not the expected format");
//         }
//       } catch (error) {
//         console.error("Error fetching articles: ", error);
//       }
//     };

//     fetchArticles();
//   }, [startIndex]);

//   //FUNKCJA DO PRZEWIJANIA STRONY
//   const handleScroll = ({ scrollTop }) => {
//     if (
//       scrollTop + window.innerHeight >=
//       document.documentElement.scrollHeight - 100
//     ) {
//       if (startIndex + PAGE_SIZE < totalArticles) {
//         setStartIndex((prevIndex) => prevIndex + PAGE_SIZE);
//       }
//     }
//   };

//   const renderRow = ({ key, index, style }) => {
//     const article = articles[index];
//     return (
//       <div key={key} style={style}>
//         <div>Title: {article.title}</div>
//         <div>Content: {article.content}</div>
//         <div>Author: {article.author}</div>
//         <div>
//           Date: {dayjs(article.created_at).format("DD/MM/YYYY HH:mm:ss")}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <h2>Articles</h2>
//       <WindowScroller>
//         {({ height, isScrolling, scrollTop }) => (
//           <AutoSizer disableHeight>
//             {({ width }) => (
//               <List
//                 width={800}
//                 height={height}
//                 rowCount={articles?.length || 0}
//                 rowHeight={400}
//                 rowRenderer={renderRow}
//                 isScrolling={isScrolling}
//                 scrollTop={scrollTop}
//                 autoHeight
//                 onScroll={handleScroll}
//               />
//             )}
//           </AutoSizer>
//         )}
//       </WindowScroller>
//     </div>
//   );
// };

//!!!!!!!!!!!!!!!!!!!!!!!!STARY KOD!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//pobrac tu dane zz serwera (za pomocą axios)
// export const ArticleList = () => {
//   const [articles, setArticles] = useState([]);

//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         //wysłanie zapytania
//         const response = await axios.get("http://localhost:5000/articles");

//         setArticles(response.data);
//       } catch (error) {
//         console.error("Error fetching articles: ", error);
//       }
//     };
//     fetchArticles();
//   }, []);

//   return (
//     <div>
//       <ul>
//         {articles.map((article, index) => (
//           <li key={index}>
//             <div>Title: {article.title}</div>
//             <div>Content: {article.content}</div>
//             <div>Author: {article.author}</div>
//             <div>
//               Date: {dayjs(article.created_at).format("DD/MM/YYYY HH:mm:ss")}
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
