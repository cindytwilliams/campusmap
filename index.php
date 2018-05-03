<?php include 'header.php' ?>

<div class="container-fluid">
  
  <div class="row no-gutters">
    
    <aside class="col-md-3" id="side_bar">
      
      <main class="logo">
        <a href="https://www.volstate.edu" title="Volunteer State Community College" rel="home" class="site-branding__logo">
          <img src="img/volstate_logo.png" alt="Volunteer State Community College">
        </a>
      </main>
      
      <input type="radio" name="campus" value="main" id="main" checked="checked" class="radio_btns">
      <ul id="main_list"></ul>
    
    </aside>

    <div class="col-md-9">
      <div id="map_canvas"></div>

  </div>  <!-- row -->

  <div class="row no-gutters footer">
    <div class="col-md-12">Copyright &copy; <?php echo date("Y"); ?> Volunteer State Community College</div>
  </div>

</div>  <!-- container -->

<?php include 'footer.php' ?>