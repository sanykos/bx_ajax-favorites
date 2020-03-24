$(function() {
    function addFavorite(id, action, elem) {
        var param = 'id='+id+'&action='+action;
        $wrapper_fav = elem.closest('.favorites__section');
        $.ajax({
            url: '/local/templates/agrolavka/ajax/favorites.php',
            type: 'GET',
            dataType: 'json',
            data: param,
            success: function(data) {
                //console.log(data);
                if(data.status == 'success') {
                    if(data.fav_status == 'deleted') {
                        $('.header-icons_fav .count').text(data.fav_count);
                        $('a.favor[data-id="'+id+'"]').removeClass('active');
                         
                        if($wrapper_fav.length > 0) {
                            $wrapper_fav.find('.catalog-item[data-item="'+id+'"]').fadeOut(300);
                        }
                       // console.log($(elem.closest('.favorites__section')).length);
                    }else if(data.fav_status == 'added') {
                        $('a.favor[data-id="'+id+'"]').addClass('active');
                        $('.header-icons_fav .count').text(data.fav_count);
                        
                    }
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error: '+ errorThrown);
            }
        });
    }


    $('body').on('click','a.favor', function() {
        let favId = $(this).data('id');
        //var $self = $(this);
        
        if($(this).hasClass('active'))
            var doAction = 'delete'
        else 
            var doAction = 'add';

        addFavorite(favId, doAction, $(this));

        return false;
    });

    
});