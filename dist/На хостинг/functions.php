<?php
function site_scripts(){
    wp_enqueue_style('site-style', get_template_directory_uri() . '/css/normalize.css/', array(), null);
    wp_enqueue_style('site-style', get_template_directory_uri() . '/css/font-awesome.css', array(), null);
    wp_enqueue_style('site-style', get_template_directory_uri() . '/style.css', array(), null);
}
add_action('wp_enqueue_scripts', 'site_scripts');

if (function_exists('add_theme_support')){
    add_theme_support('post-thumbnails');
    add_image_size('news',350,250,true);
}
?>