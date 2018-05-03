<?php include 'header.php' ?>

<div class="container-fluid">
  
  <div class="row no-gutters">
    
    <!-- sidebar -->
    <aside class="col-md-3" id="side_bar">
      
      <div class="logo">
        <a href="https://www.volstate.edu" title="Volunteer State Community College" rel="home" class="site-branding__logo">
          <img src="img/volstate_logo.png" alt="Volunteer State Community College">
        </a>
      </div>
      
      <input type="radio" name="campus" value="main" id="main" checked="checked" class="radio_btns">
      <ul id="main_list"></ul>
    
    </aside>

    <!-- map -->
    <main class="col-md-9">
      <div id="map_canvas"></div>
    </main>

  </div>  <!-- row -->

  <!-- footer -->
  <footer class="row no-gutters footer">
    <div class="col-md-12">Copyright &copy; <?php echo date("Y"); ?> Volunteer State Community College</div>
  </footer>

</div>  <!-- container -->

<?php include 'footer.php' ?>