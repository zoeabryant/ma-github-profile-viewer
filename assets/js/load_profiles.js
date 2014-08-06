$(document).ready(function(){
	$('#add_profile').on('submit', function(e){
		e.preventDefault();

		var username = $('#username').val();
		var url = 'https://api.github.com/users/' + username;

		var profile_template = $('.profile_template').html();
		Mustache.parse(profile_template);

		$.get(url, function(user){
			$('.user_errors li').slideUp('fast', function(){
				$(this).remove();
			});

			var profile = Mustache.render(profile_template, {
				username: user.login,
				avatar_url: user.avatar_url,
				user_url: user.html_url,
				public_repos: user.public_repos,
				followers_url: user.followers
			});
			$('.profile_container').prepend(profile);


		}).fail(function(){
			$('.user_errors').prepend('<li>Could not find username ' + username + '!</li>');
		}).always(function(){
			$('#username').val('');
		});
	});
});