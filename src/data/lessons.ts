import { CurriculumSection } from "../types";

export const CURRICULUM_DATA: CurriculumSection[] = [
  {
    id: "phan-1",
    title: "Phần 1: Tổng quan về Web",
    lessons: [
      {
        id: "bai-tong-quan",
        title: "Bài thực hành tổng quan về Web",
        duration: "2 giờ",
        intro: "Giúp sinh viên làm quen với các khái niệm cốt lõi của Internet: địa chỉ IP, hệ thống phân giải tên miền (DNS), cấu trúc URL, và phân biệt Web tĩnh & Web động.",
        objectives: {
          knowledge: [
            "Trình bày các khái niệm IP, DNS, Domain, Hosting, URL.",
            "Phân biệt Máy khách (Client/Browser) và Máy chủ (Web Server).",
            "So sánh ưu, nhược điểm của Web tĩnh và Web động."
          ],
          skills: [
            "Phân tích cấu trúc một chuỗi URL bất kỳ.",
            "Phân biệt và phân loại các công cụ, công nghệ phổ biến (Chrome, Apache, PHP, IIS...)."
          ],
          autonomy: [
            "Chủ động nghiên cứu tài liệu, tự thực hiện các thao tác kiểm tra mạng cơ bản."
          ]
        },
        exercises: [
          {
            id: "url-parser-tool",
            title: "Thực hành bóc tách cấu trúc URL",
            description: "Bài thực hành phân tích các thành phần kỹ thuật chi tiết của một chuỗi định vị tài nguyên URL.",
            instructions: [
              "Hãy phân tích URL mẫu: https://lms.truonghoc.edu.vn:8080/khoa-it/baitap.html",
              "Điền chính xác các thành phần vào các trường tương ứng để kiểm tra kết quả.",
              "Hiểu rõ vai trò của Protocol, Subdomain, Domain, TLD, Port, Path và File Name."
            ],
            defaultCode: `<!-- Bài học lý thuyết và mô phỏng tương tác.
Sử dụng công cụ bóc tách URL ở bảng phía bên phải của trang để thực hành! -->
<div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6;">
  <h2 style="color: #c026d3;">Cấu trúc chuẩn của một URL</h2>
  <p>Một chuỗi định vị tài nguyên URL có cấu trúc tổng quát như sau:</p>
  <code style="background: #f1f5f9; padding: 5px 10px; display: block; border-left: 4px solid #c026d3; margin: 10px 0; font-family: monospace;">
    giao_thức://địa_chỉ_máy:cổng/đường_dẫn/tên_file
  </code>
  <h3>Các thành phần chính:</h3>
  <ul>
    <li><strong>Giao thức (Protocol):</strong> Cách thức truyền tải dữ liệu (http, https, ftp...)</li>
    <li><strong>Tên miền con (Subdomain):</strong> Phân vùng nhỏ của tên miền (lms, www...)</li>
    <li><strong>Tên miền cấp 2 (Domain):</strong> Tên định danh chính (truonghoc, google...)</li>
    <li><strong>Tên miền quốc gia/TLD:</strong> Phần mở rộng cuối (edu.vn, com, net...)</li>
    <li><strong>Cổng (Port):</strong> Điểm kết nối dịch vụ (80 cho http, 443 cho https, 8080...)</li>
    <li><strong>Đường dẫn (Path):</strong> Thư mục lưu trữ tài nguyên trên máy chủ (khoa-it/)</li>
    <li><strong>Tên tệp (File Name):</strong> Tập tin tài nguyên cụ thể (baitap.html)</li>
  </ul>
</div>`,
            solutionCode: `<!-- Bản tổng quan lý thuyết hoàn chỉnh -->
<div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6; background-color: #fafafa; border-radius: 8px; border: 1px solid #e2e8f0;">
  <h2 style="color: #c026d3; border-bottom: 2px solid #c026d3; padding-bottom: 8px;">Đã hoàn thành phân tích URL</h2>
  <p style="font-style: italic; color: #64748b;">URL mẫu: <strong>https://lms.truonghoc.edu.vn:8080/khoa-it/baitap.html</strong></p>
  <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
    <thead>
      <tr style="background-color: #f1f5f9;">
        <th style="border: 1px solid #cbd5e1; padding: 8px; text-align: left;">Thành phần</th>
        <th style="border: 1px solid #cbd5e1; padding: 8px; text-align: left;">Giá trị phân tích</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: bold;">Giao thức (Protocol)</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px; color: #0284c7; font-family: monospace;">https</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: bold;">Tên miền con (Subdomain)</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px; color: #0284c7; font-family: monospace;">lms</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: bold;">Tên miền cấp 2 (Domain)</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px; color: #0284c7; font-family: monospace;">truonghoc</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: bold;">Tên miền quốc gia/TLD</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px; color: #0284c7; font-family: monospace;">edu.vn</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: bold;">Cổng (Port)</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px; color: #0284c7; font-family: monospace;">8080</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: bold;">Đường dẫn (Path)</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px; color: #0284c7; font-family: monospace;">khoa-it/</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: bold;">Tên tệp (File Name)</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px; color: #0284c7; font-family: monospace;">baitap.html</td>
      </tr>
    </tbody>
  </table>
</div>`,
            }
        ]
      }
    ]
  },
  {
    id: "phan-2",
    title: "Phần 2: Thực Hành HTML",
    lessons: [
      {
        id: "bai-1",
        title: "Bài 1. Sử dụng các thẻ cơ bản trong HTML",
        duration: "4 giờ",
        intro: "Giới thiệu các thẻ định dạng văn bản cơ bản, chỉ số trên/dưới, thẻ liên kết, hình ảnh và thẻ phân vùng bố cục div.",
        objectives: {
          knowledge: [
            "Hiểu cấu trúc của một file HTML5 tiêu chuẩn.",
            "Nắm vững các thẻ định dạng chữ: h1-h6, b, u, i, sub, sup, center, font.",
            "Hiểu cách hoạt động của thẻ liên kết <a>, hình ảnh <img> và thẻ bố cục <div>."
          ],
          skills: [
            "Tạo trang web đơn giản hiển thị nội dung thơ ca, công thức khoa học đúng định dạng.",
            "Xây dựng danh mục liên kết ngoài và liên kết nội bộ.",
            "Tạo bố cục trang web cơ bản với div và background."
          ],
          autonomy: [
            "Viết mã nguồn HTML sạch sẽ, đúng cú pháp, lồng ghép các thẻ hợp lý."
          ]
        },
        exercises: [
          {
            id: "bai-1-1",
            title: "Bài 1.1: Định dạng tiêu đề & Căn lề văn bản",
            description: "Thiết kế trang Web 'Trung tâm tin học' sử dụng các tiêu đề h1, h2, b, u, center và thuộc tính align.",
            instructions: [
              "Sử dụng thẻ <h1> kết hợp <b> và <center> để tạo tiêu đề chính: 'Trung tâm tin học'",
              "Sử dụng thẻ <h2> và <u> để tạo dòng phụ: 'Thiết kế trang Web có nội dung như sau:'",
              "Sử dụng các đoạn văn <p> với thuộc tính align để căn lề trái (left), giữa (center), phải (right)."
            ],
            defaultCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Bài 1.1</title>
</head>
<body>
  <!-- Viết mã nguồn của bạn ở đây -->
  
</body>
</html>`,
            solutionCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Bài 1.1: Trung tâm tin học</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
  </style>
</head>
<body>
  <center>
    <h1><b>Trung tâm tin học - ĐHBK</b></h1>
    <p>Chào mừng các bạn đến với ngôn ngữ HTML</p>
  </center>
  <hr width="100%">
  <h2 align="left"><u>Yêu cầu:</u></h2>
  <p align="left">Thiết kế trang Web có nội dung như sau:</p>
  <p align="left">Dòng này được căn lề trái (align="left")</p>
  <p align="center">Dòng này được căn giữa (align="center")</p>
  <p align="right">Dòng này được căn lề phải (align="right")</p>
</body>
</html>`,
            },
          {
            id: "bai-1-2",
            title: "Bài 1.2: Bài thơ Quê hương (Định dạng màu nền văn bản)",
            description: "Sử dụng thẻ <p background-color> hoặc style màu sắc, thẻ <i> và thanh ngang <hr> để định dạng bài thơ.",
            instructions: [
              "Đặt tiêu đề 'Bài 1.2: Quê hương' màu xanh lá mạ (#9F0) hoặc tương tự.",
              "Đoạn thơ chính được đặt trên nền màu xanh cyan (#0FC), căn giữa.",
              "Vẽ các đường phân cách ngang <hr> có độ rộng thích hợp (width: 150px)."
            ],
            defaultCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Bài 1.2 - Quê hương</title>
</head>
<body>
  <!-- Viết mã nguồn bài thơ Quê hương -->
  
</body>
</html>`,
            solutionCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Bài 1.2 - Bài thơ Quê hương</title>
  <style>
    body { font-family: 'Times New Roman', Times, serif; padding: 20px; text-align: center; }
    .title { color: #84cc16; font-size: 28px; font-weight: bold; }
    .sub-title { color: #0033FF; text-decoration: underline; font-weight: bold; }
    .poetry-block {
      background-color: #00FFFF;
      color: #0033FF;
      padding: 15px;
      display: inline-block;
      border-radius: 4px;
      line-height: 1.8;
      font-size: 16px;
      text-align: center;
      margin: 15px auto;
    }
    .highlight { color: #FF0000; font-weight: bold; }
    hr { width: 150px; border: 1px solid #999999; margin: 10px auto; }
  </style>
</head>
<body>
  <div class="title">Bài 1.2: Quê hương</div>
  <div class="sub-title">Thiết kế trang Web có nội dung sau:</div>
  
  <div class="poetry-block">
    <h3 style="color: #006600; margin-top: 0;">Quê hương</h3>
    <p><i>Quê hương là một tiếng ve<br>
    Lời ru của mẹ trưa hè à ơi<br>
    Dòng sông con nước lững lờ trôi<br>
    Quê hương là một góc trời tuổi thơ</i></p>
    <hr>
    <p><i>Quê hương ngày ấy như mơ<br>
    Tôi là cậu bé dại khờ đáng yêu<br>
    Quê hương là tiếng sáo diều<br>
    Là cánh cò trắng chiều chiều chân đê</i></p>
    <hr>
    <p><i>Quê hương là phiên chợ quê<br>
    Chợ trưa mong mẹ mang về bánh đa<br>
    Quê hương là một tiếng gà<br>
    Bình minh gáy sáng ngân nga xóm làng.</i></p>
  </div>
</body>
</html>`,
            hint: "Dùng các thẻ <i> để tạo chữ nghiêng, <br> để xuống dòng trong một khổ thơ."
          },
          {
            id: "bai-1-3",
            title: "Bài 1.3: Ghi chỉ số trên/dưới & Ký hiệu toán học, hóa học",
            description: "Sử dụng các thẻ sub, sup, pre và mã màu nền để định dạng công thức hóa học và phương trình toán học.",
            instructions: [
              "Hóa học: Tạo dòng công thức H2O và H2SO4 sử dụng thẻ <sub> (màu đỏ #CC3333).",
              "Toán học: Tạo phương trình bậc 2: ax^2 + bx + c = 0 sử dụng thẻ <sup>.",
              "Sử dụng thẻ <pre> để căn lề định dạng mã nguồn (ví dụ: vòng lặp For... Next trên nền xanh dương #09C)."
            ],
            defaultCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Bài 1.3</title>
</head>
<body>
  
</body>
</html>`,
            solutionCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Bài 1.3: Công thức toán học & hóa học</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 25px; line-height: 1.6; }
    h1 { text-align: center; color: #333; }
    .section-title { font-weight: bold; text-decoration: underline; color: #1e3a8a; }
    .chem { color: #CC3333; font-weight: bold; }
    .code-block {
      background-color: #0099CC;
      color: #ffffff;
      padding: 15px;
      font-family: 'Courier New', Courier, monospace;
      border-radius: 4px;
      margin-top: 15px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <h1>Bài 1.3: Công thức toán học</h1>
  <p><span class="section-title">Hóa học:</span> Nước <span class="chem">H<sub>2</sub>O</span>; Axit sunfuric <span class="chem">H<sub>2</sub>SO<sub>4</sub></span></p>
  
  <p><span class="section-title">Toán học:</span> Phương trình bậc 2: ax<sup>2</sup> + bx + c = 0</p>
  
  <pre class="code-block">
    For i = 0 to 10
      Tong = Tong + 1
    Next
  </pre>
</body>
</html>`,
            },
          {
            id: "bai-1-4",
            title: "Bài 1.4: Thẻ liên kết ngoài & Link Mailto",
            description: "Xây dựng danh bạ liên kết đến các trang báo điện tử và liên kết mở hộp thư email.",
            instructions: [
              "Tạo các liên kết <a> trỏ đến: vnexpress.net, tuoitre.com.vn, nhacso.net, ngoisao.net, echip.com.vn, vietnamnet.vn.",
              "Thiết lập thuộc tính target='_blank' để mở trang mới.",
              "Tạo một liên kết đặc biệt dạng mailto:webmaster@yahoo.com để tự động khởi động trình soạn thư điện tử."
            ],
            defaultCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Danh bạ Website</title>
</head>
<body>
  
</body>
</html>`,
            solutionCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Bài 1.4: Danh bạ Website</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background-color: #f8fafc; }
    .container { max-width: 500px; margin: 0 auto; background: white; padding: 25px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
    h2 { color: #1e3a8a; text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; }
    ul { list-style-type: none; padding: 0; }
    li { margin: 12px 0; }
    a { color: #2563eb; text-decoration: none; font-size: 16px; transition: color 0.2s; }
    a:hover { color: #1d4ed8; text-decoration: underline; }
    .mailto-box { background-color: #eff6ff; padding: 12px; border-radius: 6px; margin-top: 20px; border-left: 4px solid #3b82f6; }
  </style>
</head>
<body>
  <div class="container">
    <h2>DANH BẠ WEBSITE</h2>
    <ul>
      <li>🔗 <a href="https://vnexpress.net" target="_blank">VnExpress - Tin nhanh Việt Nam</a></li>
      <li>🔗 <a href="https://tuoitre.vn" target="_blank">Tuổi Trẻ Online</a></li>
      <li>🔗 <a href="https://nhacso.net" target="_blank">Nhạc Số (Lưu trữ)</a></li>
      <li>🔗 <a href="https://ngoisao.vnexpress.net" target="_blank">Ngôi Sao VN</a></li>
      <li>🔗 <a href="https://echip.com.vn" target="_blank">Echip - Thế giới công nghệ</a></li>
      <li>🔗 <a href="https://vietnamnet.vn" target="_blank">VietNamNet News</a></li>
    </ul>
    
    <div class="mailto-box">
      📬 Liên hệ quản trị viên: 
      <a href="mailto:webmaster@yahoo.com">webmaster@yahoo.com</a>
    </div>
  </div>
</body>
</html>`
          }
        ]
      },
      {
        id: "bai-2",
        title: "Bài 2. Tạo danh sách và bảng trong HTML",
        duration: "4 giờ",
        intro: "Học cách thiết lập cấu trúc dữ liệu dạng danh sách (ul, ol, li lồng nhau) và thiết lập bảng dữ liệu (table, tr, td, th, colspan, rowspan) để quản lý cấu trúc trang web.",
        objectives: {
          knowledge: [
            "Hiểu cách phân loại danh sách không thứ tự (ul) và có thứ tự (ol).",
            "Nắm vững các thuộc tính cơ bản của thẻ table: border, cellpadding, cellspacing, width.",
            "Làm chủ kỹ thuật trộn ô (colspan, rowspan) trong thiết kế bảng."
          ],
          skills: [
            "Xây dựng danh mục chương trình học lồng nhiều mức.",
            "Tạo bảng kết quả học tập chi tiết của học sinh đúng mẫu.",
            "Xây dựng bố cục chia khung website hoa tươi dạng bảng."
          ],
          autonomy: [
            "Tự phân tích kết cấu hàng cột phức tạp để chuyển đổi sang mã HTML chính xác."
          ]
        },
        exercises: [
          {
            id: "bai-2-3",
            title: "Bài 2.3: Danh sách cấp nhiều mức lồng nhau",
            description: "Thiết kế danh sách chương trình đào tạo phân loại chi tiết có số thứ tự lồng với chữ cái La Mã và dấu chấm tròn.",
            instructions: [
              "Sử dụng thẻ <ol> lồng ghép để phân chia cấp độ đào tạo: I. THIẾT KẾ WEBSITE, II. LẬP TRÌNH WEBSITE.",
              "Các mục con lồng ghép sử dụng thẻ <ul> hoặc <ol type='1'>, căn lề thẳng hàng đẹp mắt.",
              "Đặt dòng ghi chú liên hệ ở dưới cùng có liên kết email."
            ],
            defaultCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Chương Trình Đào Tạo</title>
</head>
<body>
  
</body>
</html>`,
            solutionCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Bài 2.3: Danh sách lồng nhiều mức</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #00FFFF; padding: 20px; }
    .container {
      max-width: 650px;
      margin: 0 auto;
      background-color: #002244;
      color: #00FFFF;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    }
    h2 { text-align: center; color: #ff3333; margin-top: 0; }
    .level-1 { font-weight: bold; color: #ff3333; font-size: 18px; margin-top: 15px; }
    .level-2 { color: #00ff00; list-style-type: decimal; padding-left: 20px; }
    .footer-note {
      border-top: 1px solid #00FFFF;
      padding-top: 15px;
      margin-top: 20px;
      font-size: 13px;
      text-align: center;
    }
    .footer-note a { color: #ffffff; text-decoration: none; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <h2>CHƯƠNG TRÌNH ĐÀO TẠO NGÀNH WEBSITE</h2>
    
    <div class="level-1">I. THIẾT KẾ WEBSITE</div>
    <ol class="level-2">
      <li>Ngôn ngữ HTML & FrontPage</li>
      <li>Ngôn ngữ kịch bản JavaScript</li>
      <li>Thiết kế ảnh động Media Flash MX</li>
      <li>Thiết kế giao diện PhotoShop CS</li>
      <li>Thiết kế Web với Dreamweaver MX</li>
    </ol>
    
    <div class="level-1">II. LẬP TRÌNH WEBSITE</div>
    <ol class="level-2" start="6">
      <li>Phân tích & Thiết kế CSDL</li>
      <li>Lập trình CSDL ASP.NET & SQL Server</li>
      <li>Quản trị Website</li>
      <li>Đề tài tốt nghiệp</li>
    </ol>
    
    <div class="footer-note">
      Mọi thông tin xin liên hệ: <a href="mailto:Webmaster@yahoo.com">Webmaster@yahoo.com</a>
    </div>
  </div>
</body>
</html>`
          },
          {
            id: "bai-2-5",
            title: "Bài 2.5: Tạo bảng kết quả học tập",
            description: "Xây dựng bảng tổng hợp kết quả học tập của học sinh có gộp cột (colspan), gộp hàng (rowspan), màu sắc và căn lề.",
            instructions: [
              "Tạo bảng có độ rộng table=600, border=1, cellpadding=5, cellspacing=0.",
              "Dòng tiêu đề 'KẾT QUẢ HỌC TẬP' được gộp toàn bộ cột.",
              "Cột 'Điểm TB' và 'Xếp Loại' được gộp hàng, tiêu đề 'Năm sinh' được gộp cột cho Nam và Nữ.",
              "Sử dụng màu nền tiêu đề và dòng tổng kết màu xanh lá cây hoặc tùy chọn nổi bật."
            ],
            defaultCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Kết quả học tập</title>
</head>
<body>
  
</body>
</html>`,
            solutionCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Bài 2.5: Kết quả học tập</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; display: flex; justify-content: center; }
    table { width: 600px; border-collapse: collapse; text-align: center; }
    th, td { border: 1px solid #10b981; padding: 8px; }
    .header-main { background-color: #059669; color: white; font-size: 20px; font-weight: bold; }
    .header-sub { background-color: #34d399; color: #064e3b; font-weight: bold; }
    .total-row { background-color: #059669; color: white; font-weight: bold; }
    .rank-good { color: #2563eb; font-weight: bold; }
    .rank-excellent { color: #dc2626; font-weight: bold; }
  </style>
</head>
<body>
  <table>
    <thead>
      <tr>
        <th colspan="6" class="header-main">KẾT QUẢ HỌC TẬP</th>
      </tr>
      <tr class="header-sub">
        <th rowspan="2">Họ và tên<br>Học Sinh</th>
        <th colspan="2">Năm Sinh</th>
        <th rowspan="2">Điểm<br>TB</th>
        <th rowspan="2">Xếp Loại</th>
      </tr>
      <tr class="header-sub">
        <th>Nam</th>
        <th>Nữ</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Lê Thanh Xuân</td>
        <td></td>
        <td>1950</td>
        <td>8.5</td>
        <td class="rank-good">Giỏi</td>
      </tr>
      <tr>
        <td>Phan Thế Hạ</td>
        <td>1985</td>
        <td></td>
        <td>6.5</td>
        <td>Khá</td>
      </tr>
      <tr>
        <td>Trần Hoài Thu</td>
        <td></td>
        <td>1986</td>
        <td>9.5</td>
        <td class="rank-excellent">Xuất Sắc</td>
      </tr>
      <tr>
        <td>Trương Lưu Đông</td>
        <td>1984</td>
        <td></td>
        <td>6.0</td>
        <td>Trung Bình</td>
      </tr>
      <tr>
        <td>Lưu Thế Mạc</td>
        <td>1985</td>
        <td></td>
        <td>4.5</td>
        <td style="color: #6b7280;">Kém</td>
      </tr>
      <tr class="total-row">
        <td colspan="3">Tổng số học sinh đạt:</td>
        <td colspan="2">4 Học sinh</td>
      </tr>
    </tbody>
  </table>
</body>
</html>`
          }
        ]
      },
      {
        id: "bai-3",
        title: "Bài 3. Tạo form trong HTML",
        duration: "4 giờ",
        intro: "Giới thiệu các thẻ xây dựng form nhập liệu và thu thập ý kiến: input (text, password, radio, checkbox, submit, reset), textarea, select/option, fieldset, legend.",
        objectives: {
          knowledge: [
            "Hiểu cấu trúc thẻ <form> và các phương thức gửi dữ liệu.",
            "Làm chủ các kiểu thẻ input, đặc biệt là các kiểu mới trong HTML5 (date, color, range, email).",
            "Sử dụng fieldset và legend để nhóm gọn gàng các trường nhập liệu."
          ],
          skills: [
            "Thiết kế form đăng nhập login.html căn lề đẹp mắt.",
            "Tạo form thăm dò ý kiến, đăng ký du lịch chứa nhiều thành phần nhập liệu mở rộng.",
            "Sử dụng thuộc tính 'required' của HTML5 để bắt buộc điền thông tin."
          ],
          autonomy: [
            "Xây dựng biểu mẫu tối ưu, thân thiện với người dùng và có khả năng kiểm tra lỗi sơ bộ."
          ]
        },
        exercises: [
          {
            id: "bai-3-1",
            title: "Bài 3.1: Trang Đăng nhập (login.html)",
            description: "Thiết kế form Đăng nhập có 2 trường Username, Password và các nút chức năng, được căn chỉnh bằng bảng.",
            instructions: [
              "Sử dụng thẻ <form> bao bọc.",
              "Lồng bảng <table> để căn chỉnh nhãn (label) và ô nhập dữ liệu thẳng hàng.",
              "Sử dụng input type='text' cho Username và input type='password' cho Password.",
              "Thêm các nút Đăng nhập (type='submit') và Nhập lại (type='reset')."
            ],
            defaultCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Login</title>
</head>
<body>
  
</body>
</html>`,
            solutionCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Bài 3.1: Đăng nhập hệ thống</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f3f4f6; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
    .login-container { background: white; padding: 25px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); width: 350px; }
    h2 { text-align: center; color: #1e3a8a; margin-top: 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }
    table { width: 100%; border: none; }
    td { padding: 8px 4px; }
    input[type="text"], input[type="password"] { width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; box-sizing: border-box; }
    .btn-group { text-align: center; margin-top: 15px; }
    button, input[type="submit"], input[type="reset"] { padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; margin: 0 5px; }
    input[type="submit"] { background-color: #2563eb; color: white; }
    input[type="submit"]:hover { background-color: #1d4ed8; }
    input[type="reset"] { background-color: #e5e7eb; color: #374151; }
    input[type="reset"]:hover { background-color: #d1d5db; }
  </style>
</head>
<body>
  <div class="login-container">
    <h2>LOGIN FORM</h2>
    <form action="#" method="POST">
      <table>
        <tr>
          <td><label for="username">Username:</label></td>
          <td><input type="text" id="username" name="username" required placeholder="Nhập tài khoản"></td>
        </tr>
        <tr>
          <td><label for="password">Password:</label></td>
          <td><input type="password" id="password" name="password" required placeholder="Nhập mật khẩu"></td>
        </tr>
      </table>
      <div class="btn-group">
        <input type="submit" value="Login">
        <input type="reset" value="Reset">
      </div>
    </form>
  </div>
</body>
</html>`
          },
          {
            id: "bai-3-4",
            title: "Bài 3.4: Form Đăng ký du lịch",
            description: "Thiết kế form đăng ký dịch vụ du lịch phức tạp có sử dụng fieldset nhóm đoàn khách, checkbox, radio và select optgroup.",
            instructions: [
              "Sử dụng bảng trong form để bố trí giao diện cân đối màu nền nhẹ (#FFC).",
              "Chọn tour sử dụng thẻ <select> kết hợp các nhóm địa danh miền Bắc, miền Trung, miền Nam bằng <optgroup>.",
              "Sử dụng <fieldset> và <legend> để bao quanh khu vực 'Số lượng đoàn khách' gồm ô Người lớn và Trẻ em."
            ],
            defaultCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Đăng ký du lịch</title>
</head>
<body>
  
</body>
</html>`,
            solutionCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Bài 3.4: Đăng ký du lịch</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f0fdf4; padding: 20px; }
    .form-box {
      max-width: 600px;
      margin: 0 auto;
      background-color: #FFFEE0;
      border: 1px solid #cca300;
      padding: 25px;
      border-radius: 8px;
    }
    h2 { text-align: center; color: #800000; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; }
    td { padding: 8px; vertical-align: top; }
    .label-col { width: 30%; font-weight: bold; color: #4a3e00; }
    input[type="text"], select, textarea {
      width: 100%;
      padding: 6px;
      border: 1px solid #b39200;
      border-radius: 4px;
      background-color: #fff;
    }
    fieldset {
      border: 1px dashed #b39200;
      border-radius: 6px;
      padding: 10px 15px;
      margin-top: 5px;
    }
    legend {
      font-weight: bold;
      color: #800000;
      padding: 0 5px;
    }
    .btn-submit {
      background-color: #800000;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      font-weight: bold;
      display: block;
      margin: 15px auto 0 auto;
    }
    .btn-submit:hover {
      background-color: #600000;
    }
  </style>
</head>
<body>
  <div class="form-box">
    <h2>Đăng ký du lịch</h2>
    <form action="#" method="POST">
      <table>
        <tr>
          <td class="label-col">Họ và tên:</td>
          <td><input type="text" name="fullname" required placeholder="Nguyễn Văn A"></td>
        </tr>
        <tr>
          <td class="label-col">Địa chỉ:</td>
          <td><input type="text" name="address" required placeholder="Hà Nội"></td>
        </tr>
        <tr>
          <td class="label-col">Điện thoại:</td>
          <td><input type="text" name="phone" required placeholder="0987xxxxxx"></td>
        </tr>
        <tr>
          <td class="label-col">Khách du lịch:</td>
          <td>
            <label><input type="radio" name="guest_type" value="VN" checked> Việt Nam</label> &nbsp;
            <label><input type="radio" name="guest_type" value="NN"> Nước Ngoài</label>
          </td>
        </tr>
        <tr>
          <td class="label-col">Chọn tour:</td>
          <td>
            <select name="tour_choice" required>
              <optgroup label="Miền Bắc">
                <option value="HN_HL_SP">Hà Nội - Hạ Long - Sapa</option>
                <option value="HN_CB">Hà Nội - Chùa Hương - Ninh Bình</option>
                <option value="HN_CATBA">Hà Nội - Cát Bà - Tuần Châu</option>
              </optgroup>
              <optgroup label="Miền Trung">
                <option value="HUE_DN">Huế - Bạch Mã - Đà Nẵng</option>
                <option value="NT_DL">Nha Trang - Đà Lạt</option>
                <option value="TN_KT">Tây Nguyên - Gia Lai - Kon Tum</option>
              </optgroup>
              <optgroup label="Miền Nam">
                <option value="SG_MT">TP.HCM - Mỹ Tho - Cần Thơ</option>
              </optgroup>
            </select>
          </td>
        </tr>
        <tr>
          <td class="label-col">Phương tiện:</td>
          <td>
            <label><input type="radio" name="transport" value="plane" checked> Máy bay</label> &nbsp;
            <label><input type="radio" name="transport" value="car"> Xe ô tô</label>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <fieldset>
              <legend>Số lượng đoàn khách</legend>
              <table style="width: 100%;">
                <tr>
                  <td style="width: 50%;">Người lớn:<br><input type="text" name="adults" style="width: 80px;" placeholder="0" required></td>
                  <td>Trẻ em:<br><input type="text" name="children" style="width: 80px;" placeholder="0" required></td>
                </tr>
              </table>
            </fieldset>
          </td>
        </tr>
        <tr>
          <td class="label-col">Ghi chú thêm:</td>
          <td><textarea name="notes" rows="3" placeholder="Yêu cầu đặc biệt về phòng nghỉ, ăn uống..."></textarea></td>
        </tr>
      </table>
      <button type="submit" class="btn-submit">Đồng ý đăng ký</button>
    </form>
  </div>
</body>
</html>`
          }
        ]
      }
    ]
  },
  {
    id: "phan-3",
    title: "Phần 3: CSS & Bootstrap",
    lessons: [
      {
        id: "bai-4",
        title: "Bài 4. Định dạng trang web với CSS và Bootstrap",
        duration: "9 giờ",
        intro: "Học cách làm đẹp website thông qua CSS Internal, mô hình CSS Flexbox bố cục đa cột, thanh điều hướng ngang/đứng và ứng dụng framework Bootstrap 4/5.",
        objectives: {
          knowledge: [
            "Hiểu 3 cách nhúng CSS: Inline, Internal và External.",
            "Làm chủ thuộc tính hiển thị Flexbox: flex-direction, justify-content, align-items.",
            "Nắm vững các class tiện ích của Bootstrap: table, thumbnail, navbar, grid (col-md-*)."
          ],
          skills: [
            "Tạo trang bố cục web chuẩn: Header, Menu, 3 cột Content, Footer bằng Flexbox.",
            "Tạo hover hiệu ứng đổi màu cho thẻ danh sách sản phẩm.",
            "Thiết kế nhanh các giao diện quản lý nhân viên, thực đơn cà phê, giỏ hàng checkout bằng Bootstrap."
          ],
          autonomy: [
            "Tổ chức mã CSS có cấu trúc rõ ràng, tối ưu hóa giao diện hiển thị tốt trên cả máy tính và điện thoại."
          ]
        },
        exercises: [
          {
            id: "bai-4-2",
            title: "Bài 4.2: Bố cục trang web chuẩn với CSS Flexbox",
            description: "Thiết kế bộ khung trang web đầy đủ gồm: Header (đỏ), Menu (vàng), Content chia 3 cột Trái - Giữa - Phải, và Footer (vàng) dùng Flexbox.",
            instructions: [
              "Sử dụng các thẻ bố cục HTML5 chuẩn: <header>, <nav>, <main> (chứa <aside> trái, <article> giữa, <aside> phải), <footer>.",
              "Thiết lập cho vùng Content hiển thị dạng Flexbox chia cột tỷ lệ hợp lý.",
              "Đặt màu nền cho từng khối giống mẫu cấu trúc bố cục để dễ quan sát."
            ],
            defaultCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Bố cục Flexbox</title>
  <style>
    /* Viết CSS Flexbox của bạn ở đây */
  </style>
</head>
<body>
  
</body>
</html>`,
            solutionCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Bài 4.2: Bố cục trang web với CSS Flexbox</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 10px; box-sizing: border-box; }
    header {
      background-color: #ff0000;
      color: #000;
      text-align: center;
      padding: 15px;
      font-size: 24px;
      font-weight: bold;
    }
    nav {
      background-color: #ffff00;
      color: #000;
      text-align: center;
      padding: 10px;
      font-weight: bold;
      margin: 5px 0;
    }
    .content-area {
      display: flex;
      gap: 5px;
      min-height: 250px;
    }
    .left-col {
      background-color: #800080;
      color: #000;
      width: 20%;
      padding: 15px;
      font-weight: bold;
    }
    .center-col {
      background-color: #bdbdb0;
      color: #000;
      width: 60%;
      padding: 15px;
      font-weight: bold;
      text-align: center;
    }
    .right-col {
      background-color: #00ff00;
      color: #000;
      width: 20%;
      padding: 15px;
      font-weight: bold;
    }
    footer {
      background-color: #ffff00;
      color: #000;
      text-align: center;
      padding: 15px;
      font-weight: bold;
      margin-top: 5px;
    }
  </style>
</head>
<body>
  <header>header</header>
  <nav>MENU</nav>
  
  <div class="content-area">
    <div class="left-col">LEFT</div>
    <div class="center-col">CENTER</div>
    <div class="right-col">RIGHT</div>
  </div>
  
  <footer>FOOTER</footer>
</body>
</html>`
          },
          {
            id: "bai-4-4",
            title: "Bài 4.4: Trang danh sách sản phẩm giày Chanel",
            description: "Thiết kế lưới hiển thị 3 sản phẩm trên một dòng sử dụng Flexbox, có hiệu ứng hover đổi màu nền và nút MUA nổi bật.",
            instructions: [
              "Tạo thẻ bao ngoài sản phẩm hiển thị dạng flex, phân bố đều các phần tử.",
              "Mỗi card sản phẩm chứa: Ảnh giày, Tên sản phẩm, Giá bán màu đỏ nổi bật, và nút MUA màu đỏ.",
              "Viết mã CSS hover hoạt họa: Rê chuột lên card sản phẩm sẽ đổi màu nền sang xanh nhẹ (#E0F2FE) và viền nổi bật."
            ],
            defaultCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Danh sách sản phẩm</title>
</head>
<body>
  
</body>
</html>`,
            solutionCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Bài 4.4: Danh sách sản phẩm giày Chanel</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f3f4f6; padding: 20px; }
    .title-box { background-color: #d32f2f; color: white; padding: 10px; font-weight: bold; font-size: 18px; margin-bottom: 20px; text-transform: uppercase; }
    .product-list { display: flex; justify-content: space-between; gap: 20px; }
    .product-card {
      background-color: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 15px;
      width: 31%;
      text-align: center;
      box-sizing: border-box;
      transition: all 0.3s ease;
      cursor: pointer;
    }
    .product-card:hover {
      background-color: #e0f2fe;
      border-color: #0284c7;
      transform: translateY(-5px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
    .product-img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      background-color: #f1f5f9;
      margin-bottom: 15px;
      border-radius: 4px;
    }
    .product-name { font-size: 15px; font-weight: bold; color: #374151; margin-bottom: 8px; }
    .product-price { color: #dc2626; font-weight: bold; font-size: 16px; margin-bottom: 12px; }
    .btn-buy {
      background-color: #d32f2f;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      font-weight: bold;
      cursor: pointer;
      text-transform: uppercase;
      font-size: 12px;
      transition: background-color 0.2s;
    }
    .btn-buy:hover { background-color: #b71c1c; }
  </style>
</head>
<body>
  <div class="title-box">Danh Sách Sản Phẩm</div>
  
  <div class="product-list">
    <!-- Card 1 -->
    <div class="product-card">
      <div class="product-img" style="display:flex;align-items:center;justify-content:center;color:#6b7280;font-size:12px;">👠 Giày Real Classy</div>
      <div class="product-name">Giày nữ cao gót Chanel REAL</div>
      <div class="product-price">4,885,000đ</div>
      <button class="btn-buy">Mua</button>
    </div>
    
    <!-- Card 2 -->
    <div class="product-card">
      <div class="product-img" style="display:flex;align-items:center;justify-content:center;color:#6b7280;font-size:12px;">👠 Giày Fake Loại 1</div>
      <div class="product-name">Giày nữ cao gót Chanel FAKE 1</div>
      <div class="product-price">1,190,000đ</div>
      <button class="btn-buy">Mua</button>
    </div>
    
    <!-- Card 3 -->
    <div class="product-card">
      <div class="product-img" style="display:flex;align-items:center;justify-content:center;color:#6b7280;font-size:12px;">👠 Giày siêu rẻ</div>
      <div class="product-name">Giày nữ cao gót Chanel FAKE 2</div>
      <div class="product-price">85,000đ</div>
      <button class="btn-buy">Mua</button>
    </div>
  </div>
</body>
</html>`
          },
          {
            id: "bai-4-8",
            title: "Bài 4.8: Thiết kế Thumbnail Cửa hàng Cà phê hạt",
            description: "Sử dụng framework Bootstrap để thiết kế lưới các hộp giới thiệu (thumbnail) cho cửa hàng hạt cà phê.",
            instructions: [
              "Tích hợp thư viện Bootstrap 4 hoặc 5.",
              "Sử dụng cấu trúc lưới class='row' và class='col-md-4' để chia 3 cột cân bằng.",
              "Bọc nội dung giới thiệu cà phê trong class='card' hoặc 'thumbnail' gồm ảnh hạt, tên hạt (Robusta, Arabica, Blend), mô tả chi tiết, giá tiền và nút 'Mua Ngay' / 'Xem Sau'."
            ],
            defaultCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Cà phê hạt Bootstrap</title>
  <!-- Nhúng Bootstrap CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
</head>
<body>
  <div class="container py-4">
    <!-- Tạo lưới Bootstrap ở đây -->
    
  </div>
</body>
</html>`,
            solutionCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Bài 4.8: Cửa hàng Cà phê hạt Bootstrap</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
  <style>
    .card-img-top { height: 200px; object-fit: cover; background-color: #f5ece1; display: flex; align-items: center; justify-content: center; font-size: 24px; }
  </style>
</head>
<body>
  <div class="container py-5">
    <h1 class="text-center text-brown mb-4" style="color: #4e3629; font-weight: bold; border-bottom: 3px solid #8d6e63; padding-bottom: 12px;">CỬA HÀNG CÀ PHÊ HẠT</h1>
    
    <div class="row">
      <!-- Cột 1 -->
      <div class="col-md-4 mb-4">
        <div class="card h-100 shadow-sm">
          <div class="card-img-top">☕ Robusta</div>
          <div class="card-body">
            <h5 class="card-title font-weight-bold">Cà Phê Hạt Robusta</h5>
            <p class="text-danger font-weight-bold">Giá: 500.000đ / kg</p>
            <p class="card-text text-muted">Cà phê Robusta nguyên chất, đậm đà, hương vị mạnh mẽ, phù hợp pha phin hoặc espresso.</p>
          </div>
          <div class="card-footer bg-transparent border-top-0 d-flex justify-content-between">
            <button class="btn btn-primary btn-sm">Mua Ngay!</button>
            <button class="btn btn-outline-secondary btn-sm">Xem Sau...</button>
          </div>
        </div>
      </div>
      
      <!-- Cột 2 -->
      <div class="col-md-4 mb-4">
        <div class="card h-100 shadow-sm">
          <div class="card-img-top">☕ Arabica</div>
          <div class="card-body">
            <h5 class="card-title font-weight-bold">Cà Phê Hạt Arabica</h5>
            <p class="text-danger font-weight-bold">Giá: 1.000.000đ / kg</p>
            <p class="card-text text-muted">Cà phê Arabica cao cấp, vị chua nhẹ, hương thơm quyến rũ, lý tưởng cho pha pour-over.</p>
          </div>
          <div class="card-footer bg-transparent border-top-0 d-flex justify-content-between">
            <button class="btn btn-primary btn-sm">Mua Ngay!</button>
            <button class="btn btn-outline-secondary btn-sm">Xem Sau...</button>
          </div>
        </div>
      </div>
      
      <!-- Cột 3 -->
      <div class="col-md-4 mb-4">
        <div class="card h-100 shadow-sm">
          <div class="card-img-top">☕ Premium Blend</div>
          <div class="card-body">
            <h5 class="card-title font-weight-bold">Cà Phê Hạt Blend Đặc Biệt</h5>
            <p class="text-danger font-weight-bold">Giá: 1.500.000đ / kg</p>
            <p class="card-text text-muted">Hỗn hợp hoàn hảo giữa Robusta và Arabica, cân bằng hương vị, thách thức mọi phương pháp pha chế.</p>
          </div>
          <div class="card-footer bg-transparent border-top-0 d-flex justify-content-between">
            <button class="btn btn-primary btn-sm">Mua Ngay!</button>
            <button class="btn btn-outline-secondary btn-sm">Xem Sau...</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`
          }
        ]
      }
    ]
  },
  {
    id: "phan-4",
    title: "Phần 4: Lập Trình JavaScript & DOM",
    lessons: [
      {
        id: "bai-5",
        title: "Bài 5. Xử lý sự kiện trong DOM JavaScript",
        duration: "4 giờ",
        intro: "Học cách viết mã JavaScript tương tác trực tiếp với các phần tử HTML qua mô hình sự kiện (Event Listener, onClick) và chỉnh sửa giao diện DOM động.",
        objectives: {
          knowledge: [
            "Hiểu mô hình cây phân cấp tài liệu DOM (Document Object Model).",
            "Nắm vững cách bắt sự kiện click, lấy giá trị phần tử qua '.value' và chỉnh thuộc tính '.src'.",
            "Hiểu các hàm kiểm tra dữ liệu đầu vào (Validation)."
          ],
          skills: [
            "Viết hàm hiển thị cảnh báo từ textbox khi click nút bấm.",
            "Tạo hiệu ứng bật tắt bóng đèn thông qua đổi ảnh thực tế.",
            "Tạo ứng dụng thêm/bớt hàng loạt trường email động.",
            "Viết trang kiểm tra lỗi biểu mẫu tài khoản (Validate fullname, email, password)."
          ],
          autonomy: [
            "Viết mã JavaScript độc lập chuẩn xác, bóc tách hàm hợp lý, quản lý sự kiện thông minh."
          ]
        },
        exercises: [
          {
            id: "bai-5-2",
            title: "Bài 5.2: Bật tắt đèn bằng JavaScript",
            description: "Sử dụng sự kiện click chuột để thay đổi nguồn ảnh (src) của một bóng đèn từ tắt sang bật và ngược lại.",
            instructions: [
              "Chèn thẻ <img> hiển thị bóng đèn đang tắt.",
              "Sử dụng ảnh đại diện bóng đèn tắt (hoặc emoji/biểu tượng tương ứng) và bóng đèn bật.",
              "Viết hàm JavaScript changeimage() bắt sự kiện click trực tiếp lên ảnh hoặc qua nút bấm để thay đổi trạng thái và cập nhật ảnh tương ứng."
            ],
            defaultCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Bật tắt đèn</title>
</head>
<body>
  <!-- Gợi ý: Có thể dùng nút bấm hoặc click trực tiếp lên ảnh -->
  
</body>
</html>`,
            solutionCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Bài 5.2: Bật tắt bóng đèn</title>
  <style>
    body { font-family: Arial, sans-serif; text-align: center; padding: 40px; background-color: #f1f5f9; }
    .lamp-container { background: white; padding: 30px; display: inline-block; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
    img { width: 150px; height: auto; cursor: pointer; transition: transform 0.2s; }
    img:active { transform: scale(0.95); }
    .status-text { margin-top: 20px; font-weight: bold; font-size: 18px; color: #334155; }
    button { margin-top: 15px; padding: 8px 16px; font-weight: bold; background-color: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer; }
    button:hover { background-color: #1d4ed8; }
  </style>
</head>
<body>
  <div class="lamp-container">
    <h2>Bật Tắt Đèn Bằng JS</h2>
    <!-- Sử dụng SVG inline hoặc Emoji lớn làm bóng đèn mô phỏng để không bị lỗi ảnh -->
    <div id="lamp-emoji" style="font-size: 100px; filter: drop-shadow(0 0 10px transparent); transition: all 0.3s;">💡</div>
    
    <div class="status-text" id="status">Đèn đang BẬT</div>
    <button onclick="toggleLamp()">Bật / Tắt</button>
  </div>

  <script>
    let isOn = true;
    function toggleLamp() {
      const lamp = document.getElementById('lamp-emoji');
      const status = document.getElementById('status');
      if (isOn) {
        lamp.innerHTML = '🔌';
        lamp.style.filter = 'none';
        status.innerHTML = 'Đèn đang TẮT';
        isOn = false;
      } else {
        lamp.innerHTML = '💡';
        lamp.style.filter = 'drop-shadow(0 0 25px #fbbf24)';
        status.innerHTML = 'Đèn đang BẬT';
        isOn = true;
      }
    }
    // Thiết lập hiệu ứng phát sáng ban đầu
    document.getElementById('lamp-emoji').style.filter = 'drop-shadow(0 0 25px #fbbf24)';
  </script>
</body>
</html>`
          },
          {
            id: "bai-5-3",
            title: "Bài 5.3: Bổ sung các thành phần động trong DOM",
            description: "Viết mã JavaScript động quản lý biểu mẫu nhận nhiều địa chỉ Email, cho phép người dùng click 'Add More' để thêm dòng mới, và 'Remove' để xóa dòng bất kỳ.",
            instructions: [
              "Tạo một cấu trúc chứa ô nhập địa chỉ Email đầu tiên và nút 'Add More'.",
              "Viết hàm JavaScript sử dụng document.createElement() hoặc insertAdjacentHTML() để thêm các hàng nhập liệu mới khi nhấn 'Add More'.",
              "Mỗi hàng mới thêm vào đều đi kèm một nút 'Remove' có khả năng xóa chính nó khỏi DOM khi được kích hoạt."
            ],
            defaultCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Thêm bớt phần tử động</title>
</head>
<body>
  
</body>
</html>`,
            solutionCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Bài 5.3: Thêm bớt thành phần động trong JS</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background-color: #f8fafc; }
    .container { max-width: 500px; margin: 0 auto; background: white; padding: 25px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    h2 { text-align: center; color: #1e293b; margin-top: 0; }
    .email-row { display: flex; gap: 10px; margin-bottom: 12px; align-items: center; }
    input[type="email"] { flex-grow: 1; padding: 8px; border: 1px solid #cbd5e1; border-radius: 4px; }
    button { padding: 8px 14px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
    .btn-add { background-color: #0284c7; color: white; }
    .btn-add:hover { background-color: #0369a1; }
    .btn-remove { background-color: #ef4444; color: white; }
    .btn-remove:hover { background-color: #dc2626; }
  </style>
</head>
<body>
  <div class="container">
    <h2>Dynamic Email List</h2>
    <p style="color: #64748b; font-size: 14px; text-align: center;">Thêm nhiều địa chỉ Email để gửi thông báo</p>
    
    <div id="email-container">
      <div class="email-row">
        <input type="email" placeholder="Enter Your Mail Address" required>
        <button class="btn-add" onclick="addNewEmail()">Add More</button>
      </div>
    </div>
  </div>

  <script>
    function addNewEmail() {
      const container = document.getElementById('email-container');
      
      const newRow = document.createElement('div');
      newRow.className = 'email-row';
      
      newRow.innerHTML = \`
        <input type="email" placeholder="Enter Your Mail Address" required>
        <button class="btn-remove" onclick="removeEmail(this)">Remove</button>
      \`;
      
      container.appendChild(newRow);
    }
    
    function removeEmail(buttonElement) {
      const row = buttonElement.parentElement;
      row.remove();
    }
  </script>
</body>
</html>`
          },
          {
            id: "bai-5-6",
            title: "Bài 5.6: Thiết lập Validate biểu mẫu Tạo tài khoản",
            description: "Viết mã JavaScript kiểm tra toàn diện dữ liệu nhập vào Form đăng ký thành viên trước khi gửi lên hệ thống.",
            instructions: [
              "Tạo form chứa các ô: Tên người dùng, Email, Mật khẩu, Nhập lại mật khẩu.",
              "Bắt sự kiện submit của form.",
              "Kiểm tra: Tên người dùng phải có ít nhất 6 ký tự.",
              "Email phải chứa ký tự '@' và có tên miền hợp lệ.",
              "Mật khẩu ít nhất 6 ký tự và trường nhập lại mật khẩu phải trùng khớp.",
              "Hiển thị thông báo lỗi màu đỏ trực quan dưới từng ô nhập liệu bị sai."
            ],
            defaultCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Validate Form</title>
</head>
<body>
  
</body>
</html>`,
            solutionCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Bài 5.6: Tạo tài khoản với Validate JS</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f1f5f9; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
    .card { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 400px; }
    h2 { text-align: center; color: #1e3a8a; margin-top: 0; }
    .form-group { margin-bottom: 15px; }
    label { display: block; font-weight: bold; margin-bottom: 5px; color: #475569; }
    input { width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 4px; box-sizing: border-box; }
    input:focus { border-color: #2563eb; outline: none; }
    .error-msg { color: #ef4444; font-size: 12px; margin-top: 4px; display: none; }
    .success-alert { background-color: #dcfce7; color: #15803d; padding: 10px; border-radius: 4px; text-align: center; font-weight: bold; margin-bottom: 15px; display: none; }
    button { width: 100%; padding: 10px; background-color: #2563eb; color: white; border: none; border-radius: 4px; font-weight: bold; font-size: 16px; cursor: pointer; }
    button:hover { background-color: #1d4ed8; }
  </style>
</head>
<body>
  <div class="card">
    <h2>Tạo Tài Khoản</h2>
    <p style="text-align: center; color: #64748b; font-size: 14px; margin-top: -10px; margin-bottom: 20px;">Hãy điền thông tin bên dưới để đăng ký.</p>
    
    <div id="successBox" class="success-alert">Chúc mừng! Bạn đã đăng ký thành công.</div>
    
    <form id="signupForm" onsubmit="return validateForm(event)">
      <div class="form-group">
        <label>Tên người dùng:</label>
        <input type="text" id="username" placeholder="Nhập tên đăng nhập">
        <div id="usernameErr" class="error-msg">Tên đăng nhập phải có ít nhất 6 ký tự.</div>
      </div>
      
      <div class="form-group">
        <label>Email:</label>
        <input type="text" id="email" placeholder="example@domain.com">
        <div id="emailErr" class="error-msg">Email không đúng định dạng (thiếu @ hoặc domain).</div>
      </div>
      
      <div class="form-group">
        <label>Mật khẩu:</label>
        <input type="password" id="password" placeholder="Nhập mật khẩu">
        <div id="passwordErr" class="error-msg">Mật khẩu phải có ít nhất 6 ký tự.</div>
      </div>
      
      <div class="form-group">
        <label>Nhập lại Mật khẩu:</label>
        <input type="password" id="confirmPassword" placeholder="Xác nhận mật khẩu">
        <div id="confirmPasswordErr" class="error-msg">Mật khẩu nhập lại không khớp.</div>
      </div>
      
      <button type="submit">Đăng ký</button>
    </form>
  </div>

  <script>
    function validateForm(event) {
      event.preventDefault();
      
      // Lấy các trường trị
      const username = document.getElementById('username').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const confirmPassword = document.getElementById('confirmPassword').value.trim();
      
      let isValid = true;
      
      // Reset errors
      document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');
      document.getElementById('successBox').style.display = 'none';
      
      // Validate username
      if (username.length < 6) {
        document.getElementById('usernameErr').style.display = 'block';
        isValid = false;
      }
      
      // Validate email simple regex
      const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      if (!emailRegex.test(email)) {
        document.getElementById('emailErr').style.display = 'block';
        isValid = false;
      }
      
      // Validate password
      if (password.length < 6) {
        document.getElementById('passwordErr').style.display = 'block';
        isValid = false;
      }
      
      // Validate match password
      if (password !== confirmPassword || confirmPassword === '') {
        document.getElementById('confirmPasswordErr').style.display = 'block';
        isValid = false;
      }
      
      if (isValid) {
        document.getElementById('successBox').style.display = 'block';
        document.getElementById('signupForm').reset();
      }
      
      return false;
    }
  </script>
</body>
</html>`
          }
        ]
      }
    ]
  },
  {
    id: "phan-5",
    title: "Phần 5: Bài Tập Tổng Hợp",
    lessons: [
      {
        id: "bai-6-7",
        title: "Bài 6 & 7: Thiết kế Trang chủ & Chi tiết Online Store",
        duration: "16 giờ",
        intro: "Bài tập lớn thiết lập website thương mại hoàn chỉnh. Sinh viên sẽ lắp ráp các thành phần: Banner, Grid, Sidebar danh mục, List Group, Tab hiển thị giới thiệu/độ mỏng/đánh giá sản phẩm MacBook Air M1.",
        objectives: {
          knowledge: [
            "Hiểu cách tổ chức cấu trúc của một dự án web thương mại nhiều trang phức tạp.",
            "Sử dụng thuần thục hệ thống lưới responsive của Bootstrap.",
            "Thiết lập thành phần động JavaScript như Tabs, Tooltips và Collapse."
          ],
          skills: [
            "Tạo trang chủ trưng bày các sản phẩm laptop có chia danh mục và phân trang.",
            "Tạo trang chi tiết MacBook Air gồm thư viện ảnh con, chọn màu sắc, và panel 3 Tabs chi tiết."
          ],
          autonomy: [
            "Có tư duy thẩm mỹ cao, tổ chức bố cục khoa học, phối hợp màu sắc hài hòa và viết mã chuyên nghiệp."
          ]
        },
        exercises: [
          {
            id: "bai-7-tabs",
            title: "Thiết kế Tab thông tin sản phẩm MacBook Air M1",
            description: "Lắp ráp phần Tabs chi tiết sản phẩm gồm 3 Tab: GIỚI THIỆU (có chức năng Đọc thêm ẩn hiện), THÔNG SỐ KỸ THUẬT (bảng dữ liệu đẹp mắt), và ĐÁNH GIÁ (độ thỏa dụng sao, thanh tiến trình màu cam).",
            instructions: [
              "Xây dựng menu tab điều hướng phía trên.",
              "Viết mã JavaScript bắt sự kiện chuyển đổi qua lại giữa các nội dung tab khi nhấp chuột mà không load lại trang.",
              "Thiết kế tab đánh giá có các thanh thống kê phần trăm sao tuyệt đẹp."
            ],
            defaultCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>MacBook Air M1 Tab Details</title>
</head>
<body>
  
</body>
</html>`,
            solutionCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Bài 7: Tab Chi tiết Sản phẩm MacBook Air M1</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f8fafc; padding: 20px; }
    .product-container { max-width: 800px; margin: 0 auto; background: white; padding: 25px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    h2 { color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px; margin-top: 0; }
    
    /* Tabs Styles */
    .tab-header { display: flex; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; gap: 10px; }
    .tab-btn { padding: 10px 20px; border: none; background: none; font-size: 15px; font-weight: bold; color: #64748b; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s; }
    .tab-btn.active { color: #2563eb; border-bottom-color: #2563eb; }
    .tab-content { display: none; }
    .tab-content.active { display: block; }
    
    /* Tab 1: Intro styles */
    .collapse-content { display: none; margin-top: 10px; }
    .btn-toggle { background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; padding: 6px 12px; border-radius: 4px; font-weight: bold; cursor: pointer; margin-top: 10px; }
    
    /* Tab 2: Spec table */
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    td, th { border: 1px solid #e2e8f0; padding: 10px; text-align: left; }
    tr:nth-child(even) { background-color: #f8fafc; }
    th { background-color: #f1f5f9; font-weight: bold; }
    
    /* Tab 3: Ratings */
    .rating-summary { display: flex; align-items: center; gap: 20px; margin-bottom: 20px; }
    .score { font-size: 48px; font-weight: bold; color: #ea580c; }
    .stars { font-size: 24px; color: #fbbf24; }
    .bar-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; font-size: 14px; color: #475569; }
    .bar-bg { width: 200px; height: 10px; background-color: #e2e8f0; border-radius: 5px; overflow: hidden; }
    .bar-fill { height: 100%; background-color: #ea580c; border-radius: 5px; }
  </style>
</head>
<body>
  <div class="product-container">
    <h2>Laptop Apple MacBook Air M1 2020 (8GB/256GB)</h2>
    
    <!-- Tab Headers -->
    <div class="tab-header">
      <button class="tab-btn active" onclick="switchTab(event, 'intro')">GIỚI THIỆU</button>
      <button class="tab-btn" onclick="switchTab(event, 'specs')">THÔNG SỐ KỸ THUẬT</button>
      <button class="tab-btn" onclick="switchTab(event, 'reviews')">ĐÁNH GIÁ</button>
    </div>
    
    <!-- Tab 1: Giới thiệu -->
    <div id="intro" class="tab-content active">
      <p>Laptop Apple MacBook Air M1 2020 thuộc dòng laptop cao cấp sang trọng có cấu hình mạnh mẽ, chinh phục được các tính năng văn phòng lẫn đồ họa mà bạn mong muốn, thời lượng pin dài, thiết kế mỏng nhẹ sẽ đáp ứng tốt các nhu cầu làm việc của bạn.</p>
      
      <button class="btn-toggle" id="toggleBtn" onclick="toggleReadMore()">Xem thêm v</button>
      
      <div id="moreIntro" class="collapse-content">
        <p>Chip Apple M1 tốc độ xử lý nhanh gấp 3.5 lần thế hệ trước Chiếc MacBook này được trang bị con chip Apple M1 được sản xuất độc quyền bởi Nhà Táo trên tiến trình 5 nm, 8 lõi bao gồm 4 lõi tiết kiệm điện và 4 lõi hiệu suất cao, mang đến một hiệu năng kinh ngạc, xử lý mọi tác vụ văn phòng một cách mượt mà như Word, Excel, Powerpoint,... thực hiện tốt các nhiệm vụ chỉnh sửa hình ảnh, kết xuất 2D trên các phần mềm Photoshop, AI,... máy còn hỗ trợ tiết kiệm điện năng cao.</p>
      </div>
    </div>
    
    <!-- Tab 2: Thông số kỹ thuật -->
    <div id="specs" class="tab-content">
      <table>
        <tr>
          <th>Cấu hình</th>
          <td>Apple MacBook Air M1 2020</td>
        </tr>
        <tr>
          <th>CPU</th>
          <td>Apple M1 8-core CPU</td>
        </tr>
        <tr>
          <th>RAM</th>
          <td>8 GB LPDDR4X</td>
        </tr>
        <tr>
          <th>Ổ cứng</th>
          <td>256 GB SSD</td>
        </tr>
        <tr>
          <th>Màn hình</th>
          <td>13.3-inch Retina (2560 x 1600), IPS</td>
        </tr>
        <tr>
          <th>Cổng giao tiếp</th>
          <td>2 x Thunderbolt 3 (USB-C), Jack tai nghe 3.5 mm</td>
        </tr>
      </table>
    </div>
    
    <!-- Tab 3: Đánh giá -->
    <div id="reviews" class="tab-content">
      <div class="rating-summary">
        <div class="score">4.5</div>
        <div>
          <div class="stars">★★★★★</div>
          <div style="color: #64748b; font-size: 13px;">Dựa trên 120 đánh giá thực tế</div>
        </div>
      </div>
      
      <!-- Bars -->
      <div class="bar-row">
        <span>5 Sao</span>
        <div class="bar-bg"><div class="bar-fill" style="width: 90%;"></div></div>
        <span>90%</span>
      </div>
      <div class="bar-row">
        <span>4 Sao</span>
        <div class="bar-bg"><div class="bar-fill" style="width: 8%;"></div></div>
        <span>8%</span>
      </div>
      <div class="bar-row">
        <span>3 Sao</span>
        <div class="bar-bg"><div class="bar-fill" style="width: 2%;"></div></div>
        <span>2%</span>
      </div>
      <div class="bar-row">
        <span>2 Sao</span>
        <div class="bar-bg"><div class="bar-fill" style="width: 0%;"></div></div>
        <span>0%</span>
      </div>
    </div>
  </div>

  <script>
    function switchTab(evt, tabId) {
      // Hide all tab content
      const tabContents = document.getElementsByClassName("tab-content");
      for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
      }
      
      // Deactivate all buttons
      const tabButtons = document.getElementsByClassName("tab-btn");
      for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
      }
      
      // Show selected tab content, activate clicked button
      document.getElementById(tabId).classList.add("active");
      evt.currentTarget.classList.add("active");
    }
    
    function toggleReadMore() {
      const moreText = document.getElementById("moreIntro");
      const btn = document.getElementById("toggleBtn");
      
      if (moreText.style.display === "block") {
        moreText.style.display = "none";
        btn.innerHTML = "Xem thêm v";
      } else {
        moreText.style.display = "block";
        btn.innerHTML = "Thu gọn ^";
      }
    }
  </script>
</body>
</html>`
          }
        ]
      }
    ]
  }
];
