jQuery(document).ready(function(jQuery) {   

	jQuery( "#widget-social_share_icon_widget-2-select_theme" ).change(function () {
		var selectedTheme = "";
		jQuery( "#widget-social_share_icon_widget-2-select_theme option:selected" ).each(function() {
			selectedTheme = jQuery( this ).text();
			selectedTheme = selectedTheme.toLowerCase();
			selectedTheme = selectedTheme.replace(/\s+/g, '-')
			jQuery( ".wpssiw-social-theme-default:visible" ).hide();
			jQuery( ".wpssiw-social-theme-flat-icons:visible" ).hide();
			jQuery( ".wpssiw-social-theme-paper-fold:visible" ).hide();
			jQuery( ".wpssiw-social-theme-radiused:visible" ).hide();
			jQuery( ".wpssiw-social-theme-branded:visible" ).hide();
			jQuery( ".wpssiw-social-theme-octagon:visible" ).hide();
			jQuery( ".wpssiw-social-theme-social-sketched:visible" ).hide();
			jQuery( ".wpssiw-social-theme-hanging" ).hide();
			jQuery( ".wpssiw-social-theme-tricon:visible" ).hide();
			jQuery( ".wpssiw-social-theme-default:visible" ).hide();
			jQuery( ".wpssiw-social-theme-hollow:visible" ).hide();
			jQuery( ".wpssiw-social-theme-social-lambs:visible" ).hide();
			jQuery( ".wpssiw-social-theme-3d-squares:visible" ).hide();
			jQuery( ".wpssiw-social-theme-3d-boxes:visible" ).hide();
			jQuery( ".wpssiw-social-theme-white-stitched-border:visible" ).hide();
			jQuery( ".wpssiw-social-theme-white-rounded:visible" ).hide();
			jQuery( ".wpssiw-social-theme-sprayed:visible" ).hide();
			jQuery( ".wpssiw-social-theme-social-badges:visible" ).hide();
			jQuery( ".wpssiw-social-theme-social-christmas:visible" ).hide();
			jQuery( ".wpssiw-social-theme-pyramid:visible" ).hide();
			jQuery( ".wpssiw-social-theme-green:visible" ).hide();
			jQuery( ".wpssiw-social-theme-colored:visible" ).hide();

			jQuery(".wpssiw-social-theme-"+selectedTheme).show();

		});
	});

	jQuery("#widget-social_share_icon_widget-2-savewidget").click(function() {
		setTimeout(function() {
			window.location.reload();
		}, 700);
	});

	jQuery( "#widget-social_share_icon_widget-2-select_animation" ).change(function () {
		var selectedAnimation = "";
		jQuery( "#widget-social_share_icon_widget-2-select_animation option:selected" ).each(function() {
			jQuery( "#wpssiw-social-theme-preview a img" ).removeClass();
			selectedAnimation = jQuery( this ).text();
			selectedAnimation = selectedAnimation.toLowerCase();
			selectedAnimation = selectedAnimation.replace(/\s+/g, '-')
			jQuery( "#wpssiw-social-theme-preview a img" ).addClass( "hvr-"+selectedAnimation );

		});
	});
});