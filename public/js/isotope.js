/**
 * Created by Kewen on 12/16/15.
 */


// external js: isotope.pkgd.js, cells-by-column.js, cells-by-row.js, fit-columns.js, horizontal.js, masonry-horizontal.js

$(document).ready(function() {
	// init Isotope
	var $grid = $('.grid').isotope({
		itemSelector: '.grid-item',
		layoutMode: 'masonry',
		getSortData: {
			title: '.note-title',
			newest: '.note-create-time',
			oldest: '.note-create-time'
		},
		sortBy: "newest",
		sortAscending: false,
		masonry: {
			columnWidth: 110
		},
		cellsByRow: {
			columnWidth: 220,
			rowHeight: 220
		},
		masonryHorizontal: {
			rowHeight: 110
		},
		cellsByColumn: {
			columnWidth: 220,
			rowHeight: 220
		}
	});
	$grid.isotope('layout');
	var isHorizontal = false;
	var $window = $(window);

	$('.layout-mode-menu-group').on('change', function() {

		// change layout mode
		var layoutModeValue = this.value;//.attr('data-layout-mode');
		console.log(layoutModeValue);

		// adjust container sizing if layout mode is changing from vertical or horizontal
		var isHorizontalMode;
		if (layoutModeValue === 'masonryHorizontal' || layoutModeValue === 'fitColumns' || layoutModeValue === 'horizontal')
			isHorizontalMode = true;
		else
			isHorizontalMode = false;

		console.log(isHorizontalMode);
		if (isHorizontal !== isHorizontalMode) {
			// change container size if horiz/vert change
			var containerStyle = isHorizontalMode ? {
				height: $window.height() * 0.7
			} : {
				width: 'auto'
			};
			$grid.css(containerStyle);
			isHorizontal = isHorizontalMode;
		}
		$grid.isotope('reloadItems');
		$grid.isotope({
			layoutMode: layoutModeValue
		});

	});


	// bind sort button click
	$('.sort-by-button-group').on( 'click', 'button', function() {
		$('.filters-button-group').find('.is-checked').removeClass('is-checked');
		$('.filters-button-group').find('#showAllF').addClass('is-checked');
		$grid.isotope({ filter: '*' });
		$grid.isotope('reloadItems');
		var sortValue = $(this).attr('data-sort-value');
		console.log(sortValue);
		//$grid.isotope('reloadItems');
		if (sortValue === 'newest') {
			$grid.isotope({sortBy: sortValue, sortAscending: false});
		}
		else if (sortValue === 'oldest') {
			$grid.isotope({sortBy: sortValue, sortAscending: true});
		}
		else if (sortValue === 'title') {
			$grid.isotope({sortBy: sortValue, sortAscending: true});
		}
		$grid.isotope('updateSortData').isotope();
		$grid.isotope('reloadItems');
	});


	// filter function
	var filterFns = {
		// showAll: function () {
		//   return true;
		// },
		isStar: function() {
			var star = $(this).find('.note-star').text();
			return star == 'star';
		},
		last1hrs: function () {
			var createTime = $(this).find('.note-create-time').text();
			var createTimeMilli = Date.parse(createTime);
			console.log(createTimeMilli);
			console.log(Date.now());
			return (Date.now() - createTimeMilli) < 3600000;
		}
	};
	// bind filter button click
	$('.filters-button-group').on( 'click', 'button', function() {
		$grid.isotope({ filter: '*' });
		$grid.isotope('reloadItems');
		var filterValue = $( this ).attr('data-filter');
		// use filterFn if matches value
		filterValue = filterFns[ filterValue ] || filterValue;
		console.log(filterValue);
		$grid.isotope('reloadItems');
		$grid.isotope({ filter: filterValue });
	});
	$('#showAllF').on('click', function () {
		$grid.isotope({ filter: '*' });
		$grid.isotope('reloadItems');

	});

	$('.shuffle-button').on( 'click', function() {
		console.log("shuffle");
		$grid.isotope('reloadItems');
		$grid.isotope('shuffle');
		$grid.isotope('updateSortData').isotope();

	});


	// change is-checked class on buttons
	$('.button-group').each(function(i, buttonGroup) {
		var $buttonGroup = $(buttonGroup);
		$buttonGroup.on('click', 'button', function() {
			$buttonGroup.find('.is-checked').removeClass('is-checked');
			$(this).addClass('is-checked');
		});
	});




});