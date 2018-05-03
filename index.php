<?php include 'header.php' ?>
  
  <div class="row">
    
    <aside class="col-md-4" id="side_bar">
      
      <div class="logo">
        <a href="https://www.volstate.edu" title="Volunteer State Community College" rel="home" class="site-branding__logo">
          <img src="img/volstate_logo.png" alt="Volunteer State Community College">
        </a>
      </div>
      
      <input type="radio" name="campus" value="main" id="main" checked="checked" class="radio_btns">
      <ul id="main_list"></ul>
    
    </aside>

    <main class="col-md-8" id="map_canvas"></main>

  </div>  <!-- row -->

<?php include 'footer.php' ?>