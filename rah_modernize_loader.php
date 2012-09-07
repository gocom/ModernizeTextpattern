<?php

/**
 * A Textpattern plugin loader for ModernizeTextpattern. Can be installed
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

	new rah_modernize();

/**
 * Collects sources and adds them to the <head>
 */

class rah_modernize {

	/**
	 * @var string Path to assets directory
	 */

	protected $assets = '';

	/**
	 * Constructor
	 */
	
	public function __construct() {
		register_callback(array($this, 'head'), 'admin_side', 'head_end');
		
		if(defined('rah_modernize')) {
			$f = rtrim(rah_modernize, '\\/');
		}
		
		else {
			$f = dirname(txpath) . '/rah_modernize';
		}
		
		if($this->safe_dir($f)) {
			$this->assets = $f;
		}
	}
	
	/**
	 * Checks that directory is readable
	 * @return bool
	 */
	
	public function safe_dir($f) {
		return file_exists($f) && is_readable($f) && is_dir($f);
	}
	
	/**
	 * Checks that file is readable
	 * @return bool
	 */
	
	public function safe_file($f) {
		return file_exists($f) && is_readable($f) && is_file($f);
	}
	
	/**
	 * Collects CSS and JavaScript files
	 * @param string $type Either CSS or JS
	 * @return array
	 */

	public function collect_sources($type) {
		
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

	public function head() {
		
		echo 
			'<style type="text/css">'.n.
				implode(n, $this->collect_sources('css')).n.
			'</style>';
		
		echo script_js(implode(n, $this->collect_sources('js')));
		
		if($this->safe_file($this->assets.'/modernize.js')) {
			echo script_js(file_get_contents($this->assets.'/modernize.js'));
		}
	}
}

?>