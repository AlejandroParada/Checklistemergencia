<?php
$src = __DIR__ . '/icons/icon-192.png';
$dst = __DIR__ . '/icons/apple-touch-icon-180.png';
if (!function_exists('imagecreatefrompng')) {
  fwrite(STDERR, "GD missing\n");
  exit(1);
}
$s = imagecreatefrompng($src);
$w = imagesx($s);
$h = imagesy($s);
$d = imagecreatetruecolor(180, 180);
imagealphablending($d, false);
imagesavealpha($d, true);
$transparent = imagecolorallocatealpha($d, 0, 0, 0, 127);
imagefilledrectangle($d, 0, 0, 180, 180, $transparent);
imagealphablending($d, true);
imagecopyresampled($d, $s, 0, 0, 0, 0, 180, 180, $w, $h);
imagesavealpha($d, true);
imagepng($d, $dst);
echo "wrote $dst\n";
