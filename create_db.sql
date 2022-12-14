-- Create database for Joy of Painting

CREATE DATABASE IF NOT EXISTS joy_of_painting;

USE joy_of_painting;

CREATE TABLE IF NOT EXISTS colors_used (
	id INT NOT NULL,
	painting_index INT NOT NULL,
	img_src VARCHAR(255) NOT NULL,
	painting_title VARCHAR(255) NOT NULL,
	season INT NOT NULL,
	episode INT NOT NULL,
	num_colors INT NOT NULL,
	youtube_src VARCHAR(255) NOT NULL,
	colors VARCHAR(500) NOT NULL,
	color_hex VARCHAR(500) NOT NULL,
	black_gesso INT NOT NULL DEFAULT 0,
	bright_red INT NOT NULL DEFAULT 0,
	burnt_umber INT NOT NULL DEFAULT 0,
	cadmium_yellow INT NOT NULL DEFAULT 0,
	dark_sienna INT NOT NULL DEFAULT 0,
	indian_red INT NOT NULL DEFAULT 0,
	indian_yellow INT NOT NULL DEFAULT 0,
	liquid_black INT NOT NULL DEFAULT 0,
	liquid_clear INT NOT NULL DEFAULT 0,
	midnight_black INT NOT NULL DEFAULT 0,
	phthalo_blue INT NOT NULL DEFAULT 0,
	phthalo_green INT NOT NULL DEFAULT 0,
	prussian_blue INT NOT NULL DEFAULT 0,
	sap_green INT NOT NULL DEFAULT 0,
	titanium_white INT NOT NULL DEFAULT 0,
	van_dyke_brown INT NOT NULL DEFAULT 0,
	yellow_ochre INT NOT NULL DEFAULT 0,
	alizarin_crimson INT NOT NULL DEFAULT 0,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS subject_matter (
	episode VARCHAR(6) NOT NULL,
	title VARCHAR(255) NOT NULL,
	apple_frame INT NOT NULL DEFAULT 0,
	aurora_borealis INT NOT NULL DEFAULT 0,
	barn INT NOT NULL DEFAULT 0,
	beach INT NOT NULL DEFAULT 0,
	boat INT NOT NULL DEFAULT 0,
	bridge INT NOT NULL DEFAULT 0,
	building INT NOT NULL DEFAULT 0,
	bushes INT NOT NULL DEFAULT 0,
	cabin INT NOT NULL DEFAULT 0,
	cactus INT NOT NULL DEFAULT 0,
	circle_frame INT NOT NULL DEFAULT 0,
	cirrus INT NOT NULL DEFAULT 0,
	cliff INT NOT NULL DEFAULT 0,
	clouds INT NOT NULL DEFAULT 0,
	conifer INT NOT NULL DEFAULT 0,
	cumulus INT NOT NULL DEFAULT 0,
	deciduous INT NOT NULL DEFAULT 0,
	diane_andre INT NOT NULL DEFAULT 0,
	dock INT NOT NULL DEFAULT 0,
	double_oval_frame INT NOT NULL DEFAULT 0,
	farm INT NOT NULL DEFAULT 0,
	fence INT NOT NULL DEFAULT 0,
	fire INT NOT NULL DEFAULT 0,
	florida_frame INT NOT NULL DEFAULT 0,
	flowers INT NOT NULL DEFAULT 0,
	fog INT NOT NULL DEFAULT 0,
	framed INT NOT NULL DEFAULT 0,
	grass INT NOT NULL DEFAULT 0,
	guest INT NOT NULL DEFAULT 0,
	half_circle_frame INT NOT NULL DEFAULT 0,
	half_oval_frame INT NOT NULL DEFAULT 0,
	hills INT NOT NULL DEFAULT 0,
	lake INT NOT NULL DEFAULT 0,
	lakes INT NOT NULL DEFAULT 0,
	lighthouse INT NOT NULL DEFAULT 0,
	mill INT NOT NULL DEFAULT 0,
	moon INT NOT NULL DEFAULT 0,
	mountain INT NOT NULL DEFAULT 0,
	mountains INT NOT NULL DEFAULT 0,
	night INT NOT NULL DEFAULT 0,
	ocean INT NOT NULL DEFAULT 0,
	oval_frame INT NOT NULL DEFAULT 0,
	palm_trees INT NOT NULL DEFAULT 0,
	path INT NOT NULL DEFAULT 0,
	person INT NOT NULL DEFAULT 0,
	portrait INT NOT NULL DEFAULT 0,
	rectangle_3d_frame INT NOT NULL DEFAULT 0,
	rectangular_frame INT NOT NULL DEFAULT 0,
	river INT NOT NULL DEFAULT 0,
	rocks INT NOT NULL DEFAULT 0,
	seashell_frame INT NOT NULL DEFAULT 0,
	snow INT NOT NULL DEFAULT 0,
	snowy_mountain INT NOT NULL DEFAULT 0,
	split_frame INT NOT NULL DEFAULT 0,
	steve_ross INT NOT NULL DEFAULT 0,
	structure INT NOT NULL DEFAULT 0,
	sun INT NOT NULL DEFAULT 0,
	tomb_frame INT NOT NULL DEFAULT 0,
	tree INT NOT NULL DEFAULT 0,
	trees INT NOT NULL DEFAULT 0,
	triple_frame INT NOT NULL DEFAULT 0,
	waterfall INT NOT NULL DEFAULT 0,
	waves INT NOT NULL DEFAULT 0,
	windmill INT NOT NULL DEFAULT 0,
	window_frame INT NOT NULL DEFAULT 0,
	winter INT NOT NULL DEFAULT 0,
	wood_framed INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS episode_dates (
	title VARCHAR(255) NOT NULL,
	month VARCHAR(20) NOT NULL,
	day INT NOT NULL,
	year INT NOT NULL,
	date VARCHAR(20) NOT NULL
);


LOAD DATA LOCAL INFILE 'The Joy Of Painting - Colors Used.csv'
INTO TABLE colors_used
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE 'The Joy Of Painting - Subject Matter.csv'
INTO TABLE subject_matter
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

UPDATE subject_matter SET title = SUBSTRING(title,2) WHERE title LIKE '"%';
UPDATE subject_matter SET title = SUBSTRING(title, 1, LENGTH(title)-1) WHERE title LIKE '%"';

UPDATE colors_used SET colors = REPLACE(REPLACE(colors, '\r', ''), '\n', '');