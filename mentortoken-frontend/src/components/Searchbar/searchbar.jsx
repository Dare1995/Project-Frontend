import { useEffect, useState } from "react"
import SearchedResult from "../LoggedUser/SearchedResult/searchedResult"
import "./searchbar.css"

const SearchBar = ({ accountType, token = "" }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsFocused(false);
        }, 200);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery(e);
    };

    // useEffect(() => {
    //     const searchUserByName = async (name) => {
    //         try {
    //             const usersData = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/${accountType}/${name}`, {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": `Bearer ${token}`,
    //                 },
    //             });
    //             const users = await usersData.json()
    //             setSearchResult(users);
    //         } catch (error) {
    //             console.log("This is the error: ", error);
    //         }
    //     };
    //     if (searchQuery !== "") {
    //         searchUserByName(searchQuery);
    //     } else {
    //         setSearchResult([]);
    //     }
    // }, [searchQuery]);
    useEffect(() => {
        const searchUserByName = async (name) => {
          try {
            setIsLoading(true);
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/api/auth/${accountType}/${name}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const users = await response.json();
            setSearchResult(users);
          } catch (error) {
            console.error("Error fetching search results:", error);
          } finally {
            setIsLoading(false);
          }
        };
    
        if (searchQuery.trim()) {
          const debounceTimer = setTimeout(() => {
            searchUserByName(searchQuery);
          }, 300); // Debounce for 300ms
          return () => clearTimeout(debounceTimer);
        } else {
          setSearchResult([]);
        }
      }, [searchQuery, accountType, token]);
    

    return (
        <div className="search-bar-section">
        {isFocused && (
          <div className="search-results-box">
            {isLoading ? (
              <p className="search-loading">Loading...</p>
            ) : searchResult.length > 0 ? (
              searchResult.map((user, index) => (
                <div className="result-item" key={index}>
                  <SearchedResult user={user} />
                </div>
              ))
            ) : (
              <p className="search-no-results">No results found</p>
            )}
          </div>
        )}

            <form className="searchQuery-form" onSubmit={handleSearch}>
                <input
                    value={searchQuery}
                    id="searchQuery"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    type="text"
                    placeholder={accountType === "company" ? "Search Mentor" : "Search Company"}
                />
                <button type="submit" style={{ display: "none" }}>Submit</button>
            </form>
        </div>
    );
};

export default SearchBar
