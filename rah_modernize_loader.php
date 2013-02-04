<?php

/**
 * A Textpattern plugin loader for ModernizeTextpattern.
 *
 * @author    Jukka Svahn
 * @copyright (c) 2012 Jukka Svahn
 * @date      2012-
 * @license   GNU GPLv2
 *
 * Copyright (C) 2012 Jukka Svahn http://rahforum.biz
 * Licensed under GNU Genral Public License version 2
 * http://www.gnu.org/licenses/gpl-2.0.html
 */

	new rah_modernize();

/**
 * Collects sources and adds them to the <head>
 */

class rah_modernize
{
	/**
	 * Path to assets directory.
	 *
	 * @var string
	 */

	protected $assets = '';

	/**
	 * Constructor.
	 */

	public function __construct()
	{
		register_callback(array($this, 'head'), 'admin_side', 'head_end');

		if (defined('rah_modernize'))
		{
			$f = rtrim(rah_modernize, '\\/');
		}
		else
		{
			$f = dirname(txpath) . '/rah_modernize';
		}

		if ($this->safe_dir($f))
		{
			$this->assets = $f;
		}

		if (gps('rah_modernize') == 'css')
		{
			$this->serve_css();
		}
		else if (gps('rah_modernize') == 'js')
		{
			$this->serve_js();
		}

		$this->hive();
	}

	/**
	 * Checks whether a directory is readable.
	 *
	 * @return bool
	 */

	public function safe_dir($f)
	{
		return file_exists($f) && is_readable($f) && is_dir($f);
	}

	/**
	 * Checks whether a file is readable.
	 *
	 * @return bool
	 */

	public function safe_file($f)
	{
		return file_exists($f) && is_readable($f) && is_file($f);
	}

	/**
	 * Collects CSS and JavaScript files.
	 *
	 * @param  string $type Either "css" or "js"
	 * @return array
	 */

	public function collect_sources($type)
	{
		$f = $this->assets . '/' . $type;

		if (!$this->assets || !file_exists($f)  || !is_dir($f) || !is_readable($f))
		{
			return array();
		}

		$f = glob($f.'/*.'.$type, GLOB_NOSORT);

		if (!$f)
		{
			return array();
		}

		$out = array();

		foreach ($f as $path)
		{
			if (!is_readable($path) || !is_file($path))
			{
				continue;
			}

			$out[] = file_get_contents($path);
		}

		return $out;
	}

	/**
	 * Adds styles and JavaScript to the &lt;head&gt;.
	 */

	public function head()
	{
		echo $this->attach_details();
		echo '<link rel="stylesheet" href="?rah_modernize=css" />';
		echo script_js('?rah_modernize=js', SCRIPT_URL);
	}

	/**
	 * Serves CSS.
	 */

	public function serve_css()
	{
		header('Content-type: text/css');
		echo implode(n, $this->collect_sources('css'));

		if ($this->safe_file($this->assets.'/modernize.js'))
		{
			echo file_get_contents($this->assets.'/modernize.js');
		}

		die();
	}

	/**
	 * Serves JavaScript.
	 */

	public function serve_js()
	{
		send_script_response(implode(n, $this->collect_sources('js')));
		die();
	}

	/**
	 * Toggle some Hive themes options.
	 */

	public function hive()
	{
		foreach (
			array(
				'branding',
				'textile_group',
				'tag_builder_column',
				'form_preview',
				'copy_as',
			) as $option
		)
		{
			if (!defined('hive_theme_hide_'.$option))
			{
				define('hive_theme_hide_'.$option, true);
			}
		}
	}

	/**
	 * Pass user gravatar to JavaScript.
	 */

	public function attach_details()
	{
		global $txp_user;

		$privs = fetch('privs', 'txp_users', 'name', $txp_user);
		$groups = get_groups();

		return script_js('var rah_modernize = ' . json_encode(array(
			'gravatar' => md5(get_author_email($txp_user)),
			'realname' => get_author_name($txp_user),
			'group'    => isset($groups[$privs]) ? $groups[$privs] : '',
			'color'    => get_pref('rah_modernize_color_variation')
		)).';');
	}
}
