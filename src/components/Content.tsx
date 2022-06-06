export default function Content() {
    return (
    <main className="content">
        <div className="search_panel">        
          <form className="search_form" action="">
              <input type="hidden" id='hidden_token' className='hidden_token'/>
              <div className="genre_option">
                  <label className="option_title">Genre:</label>
                  <select name="" id="select_genre" className="select_option genre">
                      <option>Select...</option>                    
                  </select>
              </div>
              <div className="playlists_option">
                  <label className="option_title">Playlists:</label>
                  <select name="" id="select_playlist" className="select_option playlist">
                      <option>Select...</option>                    
                  </select>
              </div>                  
              <div className="button_search">
                  <button type="submit" id="btn_submit" className="btn_search">Search</button>
              </div>          
          </form>        
          <div className="tracks_list">
              <div className="list_group">
                  <div className="list-group song-list">
                  </div>                                             
              </div>
              <div className="track_details" id="song-detail">                
              </div>
          </div>   
        </div> 
        <h2 className="category">Music for you</h2>
      </main>
    );
}