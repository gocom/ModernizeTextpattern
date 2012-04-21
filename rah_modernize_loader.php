<?php

/**
 * Textpattern plugin loader for the scripts. Can be installed
 * as a reqular Textpattern plugin.
 *
 * @author Jukka Svahn
 * @copyright (c) 2012 Jukka Svahn
 * @date 2012-
 * @license GNU GPLv2
 *
 * Copyright (C) 2012 Jukka Svahn <http://rahforum.biz>
 * Licensed under GNU Genral Public License version 2
 * http://www.gnu.org/licenses/gpl-2.0.html
 */

	if(@txpinterface == 'admin') {
		register_callback(array('rah_modernize', 'head'), 'admin_side', 'head_end');
	}

/**
 * Collects sources and adds them to the <head>
 */

class rah_modernize {
	
	static public $instance;
	public $assets = '';
	
	/**
	 * Get new instance
	 */
	
	static public function get() {
		
		if(!self::$instance) {
			self::$instance = new rah_modernize;
		}
		
		return self::$instance;
	}
	
	/**
	 * Constructor
	 */
	 
	public function __construct() {
		
		if(defined('rah_modernize')) {
			$f = rtrim(rah_modernize, '\\/');
		}
		
		else {
			$f = dirname(txpath) . '/rah_modernize/assets';
		}
		
		if($this->safe_dir($f)) {
			$this->assets = $f;
		}
		
		elseif($this->safe_dir(dirname(__FILE__)) && $this->safe_dir(dirname(__FILE__).'/js')) {
			$this->assets = dirname(__FILE__);
		}
	}
	
	/**
	 * Checks that directory is readable
	 * @return bool
	 */
	
	private function safe_dir($f) {
		return file_exists($f) && is_readable($f) && is_dir($f);
	}
	
	/**
	 * Checks that file is readable
	 * @return bool
	 */
	
	private function safe_file($f) {
		return file_exists($f) && is_readable($f) && is_file($f);
	}
	
	/**
	 * Collects CSS and JavaScript files
	 * @param string $type Either CSS or JS
	 * @return array
	 */

	private function collect_sources($type) {
		
		$f = $this->assets . '/' . $type;
		
		if(!$this->assets || !file_exists($f)  || !is_dir($f) || !is_readable($f)) {
			return array();
		}
		
		$f = glob($f.'/*.'.$type, GLOB_NOSORT);
		
		if(!$f) {
			return array();
		}
		
		$out = array();
		
		foreach($f as $path) {
			
			if(!is_readable($path) || !is_file($path)) {
				continue;
			}
			
			$out[] = file_get_contents($path);
		}
		
		return $out;
	}

	/**
	 * Adds styles and JavaScript to the <head>
	 */

	static public function head() {
		
		$m = rah_modernize::get();
		
		echo 
			'<style type="text/css">'.n.
				implode(n, $m->collect_sources('css')).n.
			'</style>';
		
		echo script_js(implode(n, $m->collect_sources('js')));
		
		if($m->safe_file($m->assets.'/modernize.js')) {
			echo script_js(file_get_contents($m->assets.'/modernize.js'));
		}
	}
}

?>