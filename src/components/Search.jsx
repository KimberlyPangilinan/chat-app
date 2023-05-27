import React from 'react'

const Search = () => {
  return (
   <div className="search">
      <div className="searchForm">
        <input type="text" name="" placeholder='Search a chat...' />
      </div>
      <div className="userChat">
        <img src="https://media.licdn.com/dms/image/D4D03AQHHc2GrG_M77Q/profile-displayphoto-shrink_800_800/0/1675865866867?e=2147483647&v=beta&t=LlPm0KM2HUy4FpXNAfmGNBrjDiTT3VeDlSP97Qh_yZw" alt="" />
        <div className="userChatInfo">
          <span>Jane Doe</span>
          <span className='prevMessage'>...</span>
        </div>
        
      </div>
      <div className="userChat">
        <img src="https://media.licdn.com/dms/image/D4D03AQHHc2GrG_M77Q/profile-displayphoto-shrink_800_800/0/1675865866867?e=2147483647&v=beta&t=LlPm0KM2HUy4FpXNAfmGNBrjDiTT3VeDlSP97Qh_yZw" alt="" />
        <div className="userChatInfo">
          <span>Jane Doe</span>
          <span className='prevMessage'>.</span>
        </div>
        
      </div>

   </div>
  )
}

export default Search
