"use strict";
    $(document).ready(function(){
        /*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */

        /*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
        // Hàm xử lý khi ấn nút Secrch City 
        $("#btn").on("click", function(){
            onBtnSearchClick();
        })

        /*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */  
        // Khi ấn nút Search City Validate lấy dữ liệu từ input
        // Nếu dữ liệu hợp lệ thì gọi Api lấy thông tin
        // Hiển thị thông tin ra
        function onBtnSearchClick(){
            // Khai báo đối tượng chứa dữ liệu
            var vInputCity = {
                cityName: ""
            }
            // Thu thập dữ liệu
            getCityNameData(vInputCity);
            // Kiểm tra dữ liệu đầu vào
            var isValidate = validateInputData(vInputCity);
            // Nếu dữ liệu đầu vào hợp lệ
            if (isValidate){
                // Gọi Api lấy dữ liệu thời tiết Hà Nội
                $.ajax({
                    url: 'https://api.openweathermap.org/data/2.5/weather?q=' + vInputCity.cityName + "&units=metric" +
                    "&APPID=c10bb3bd22f90d636baa008b1529ee25",
                    type: "GET",
                    dataType: 'json',
                    success: function(responseObject){
                        console.log(responseObject)
                        // Hiển thị thông tin thời tiết của Hà Nội
                        showWeatherData(responseObject);
                    },
                    error: function(error){
                        console.assert(error.responseText);
                        alert("City not foud")
                        location.reload()
                    }
                });
            }
        }
        /*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
        // Hàm thu thập dữ liệu tên thành phố
        function getCityNameData(paramInputCity){
            paramInputCity.cityName = $("#ipn-city-name-curruent").val()
            console.log(paramInputCity.cityName)
        }
        // Hàm kiểm tra dữ liệu đầu vào
        function validateInputData(paramInputCity){
            if (paramInputCity.cityName == ""){
                alert("City not found");
                return false
            }
            return true;
        }
        // Hàm hiển thị thông tin thời tiết
        function showWeatherData(paramRes){
            $("#uotput-weather").val(paramRes.weather[0].main);
            $("#uotput-weather-description").val(paramRes.weather[0].description);
            $("#img-out").attr("src", 'https://openweathermap.org/img/w/' + paramRes.weather[0].icon + ".png")
            $("#uotput-weather-Temperature").val((paramRes.main.temp) + " °C");
            $("#uotput-weather-Pressure").val(paramRes.main.pressure + " hpa");
            $("#uotput-weather-Humidity").val(paramRes.main.humidity + " %");
            $("#uotput-weather-Min-Temperature").val((paramRes.main.temp_min) + " °C");
            $("#uotput-weather-Max-Temperature").val((paramRes.main.temp_max) + " °C");
            $("#uotput-weather-Wind-Speed").val(paramRes.wind.speed + "m/s");
            $("#uotput-weather-Wind-Direction").val(paramRes.wind.deg + "°");
            document.getElementById("style").style.display = "block";
        }



















    });


   