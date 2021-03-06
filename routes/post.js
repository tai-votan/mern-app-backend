import express from 'express';
import {
  getPost,
  createPost,
  getPostBySlug,
  editPost,
  deletePost,
} from '../controllers/postControllers.js';

const post = express.Router();

/**
 * @swagger
 * /api/post:
 *  get:
 *    tags: [Post]
 *    parameters:
 *      -in: header
 *      name: Authorization
 *      type: string
 *    responses:
 *      200:
 *        description: OK
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server Error
 *    description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *  post:
 *    tags: [Post]
 *    security:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    responses:
 *      200:
 *        description: OK
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server Error
 *    requestBody:
 *      content:
 *        application/json:
 *          examples:
 *            draf:
 *              value: { "title":"3 Yếu tố không thể thiếu của mối quan hệ lành mạnh", "slug":"3-yeu-to-khong-the-thieu-cua-moi-quan-he-lanh-manh", "featuredImage": "", "oldSlug": "3-yeu-to-khong-the-thieu-cua-moi-quan-he-lanh-manh", "publish": true, "author": "Mark Manson", "content": "\"<div class=\\\"\\\"><div><p><em>Được chuyển ngữ từ \\\"<a href=\\\"https://markmanson.net/3-core-components-of-a-healthy-relationship\\\">3 Core Components of a Healthy Relationship</a>\\\", đăng trên blog cá nhân của tác giả <a href=\\\"https://vietcetera.com/vn/thong-tin-ca-nhan/mark-manson\\\">Mark Manson</a>.</em></p>\\n<hr>\\n<p>Có được <a href=\\\"https://vietcetera.com/vn/moi-quan-he-lanh-manh-su-dung-hoa-giua-gia-tri-ca-nhan-va-xuc-cam\\\" rel=\\\"noreferrer\\\">mối quan hệ lành mạnh</a> có vẻ dễ dàng với một số người. Với số còn lại, nó chẳng khác nào việc một học sinh lớp ba phải cố vượt qua kỳ thi vật lý thiên văn. Không chỉ tự đặt mình vào thế thất bại, chúng ta còn chẳng biết phải bắt đầu từ đâu trong việc tạo ra các mối quan hệ lành mạnh trong đời.</p>\\n<p>Vì thế, sau nhiều lần thử và thất bại, tôi đã tổng hợp một chỉ dẫn tuy mọt sách nhưng vẫn đủ cởi mở để phát triển các mối quan hệ lành mạnh.</p>\\n</div><div><h2>3 Yếu tố cấu thành mối quan hệ lành mạnh</h2>\\n<p>Tất cả mối quan hệ lành mạnh đều chia sẻ những giá trị cốt lõi sau:</p>\\n<h3>1. Sự tôn trọng</h3>\\n<p>Nghĩa là cả hai đều coi trọng nhau. Khi bạn tôn trọng ai đó đồng nghĩa với việc bạn ngưỡng mộ họ vì những phẩm chất nhất định mà họ sở hữu và/hoặc tính cách mà họ thể hiện.</p>\\n<h3>2. Sự tin tưởng</h3>\\n<p>Nghĩa là bạn tin vào những gì đối phương nói. Nếu một người nói rằng họ sẽ làm gì đó, người còn lại sẽ cho rằng đối phương sẽ thực hiện những gì mà họ đã nói ra. Nếu một người mắc sai lầm, người còn lại sẽ mong muốn họ thành thật chia sẻ với mình. Thực tế, niềm tin chỉ đến khi cả hai <a href=\\\"https://vietcetera.com/vn/mo-long-khi-ban-san-sang-chap-nhan-kha-nang-bi-ton-thuong\\\" rel=\\\"noreferrer\\\">hoàn toàn mở lòng</a> với nhau, cho dù điều đó không hề thoải mái.</p>\\n<h3>3. Sự thiện ý</h3>\\n<p>Trong mối quan hệ lành mạnh điều này nghĩa là quyền tự do trong việc trao và nhận. Một cặp đôi lành mạnh không cần phải tự nhắc nhở mình trong việc thể hiện với đối phương rằng họ yêu và trân trọng người đó.</p>\\n<p>Hai người đón nhận tình cảm bằng cảm tình thay vì né tránh hoặc coi đó là điều hiển nhiên. Nếu tình dục quan trọng đối với mối quan hệ, cả hai sẽ tham gia nhiệt tình (đương nhiên không phải lúc nào chúng ta cũng “có tâm trạng” nhưng phần lớn thời gian điều này nên đúng).</p>\\n<p>Thiếu đi một trong ba khía cạnh trên có thể đồng nghĩa với việc một hoặc cả hai người sở hữu <a href=\\\"https://vietcetera.com/vn/kieu-gan-bo-anh-huong-den-moi-quan-he-cua-ban-nhu-the-nao\\\" rel=\\\"noreferrer\\\">kiểu gắn bó lo âu</a> hoặc mối quan hệ đang rạn nứt ở đâu đó.</p>\\n</div><div><h2>Tình yêu là sản phẩm của một mối quan hệ lành mạnh, không phải là nền tảng của nó</h2>\\n<p><a href=\\\"https://vietcetera.com/vn/chi-yeu-thoi-thi-khong-duhttps://vietcetera.com/vn/3-su-that-tan-nhan-ve-tinh-yeu\\\" rel=\\\"noreferrer\\\">Tình yêu không phải là yếu tố cốt lõi</a> của một mối quan hệ lành mạnh. Điều này hẳn là một cú sốc đối với nhiều người. Làm sao lại có thể?</p>\\n<p>Sự thật là bạn có thể yêu một người hoàn toàn tồi tệ đối với bạn. Mọi người ở trong mối quan hệ khủng khiếp, độc hại, thậm chí là bạo hành bởi vì họ yêu nhau.</p>\\n<figure class=\\\"full-width\\\" contenteditable=\\\"false\\\">\\n            <picture>\\n              <source media=\\\"(max-width: 568px)\\\" class=\\\" lazyloading\\\" data-srcset=\\\"https://img.vietcetera.com/uploads/images/13-jun-2021/kooples-hagiang18-768x512.jpg 2x, https://img.vietcetera.com/uploads/images/13-jun-2021/kooples-hagiang18-375x248.jpg 1x\\\" srcset=\\\"https://img.vietcetera.com/uploads/images/13-jun-2021/kooples-hagiang18-768x512.jpg 2x, https://img.vietcetera.com/uploads/images/13-jun-2021/kooples-hagiang18-375x248.jpg 1x\\\">\\n              <source media=\\\"(min-width: 569px)\\\" class=\\\" lazyloading\\\" data-srcset=\\\"https://img.vietcetera.com/uploads/images/13-jun-2021/kooples-hagiang18.jpg 2x, https://img.vietcetera.com/uploads/images/13-jun-2021/kooples-hagiang18-768x512.jpg 1x\\\" srcset=\\\"https://img.vietcetera.com/uploads/images/13-jun-2021/kooples-hagiang18.jpg 2x, https://img.vietcetera.com/uploads/images/13-jun-2021/kooples-hagiang18-768x512.jpg 1x\\\">\\n              <img width=\\\"1200\\\" height=\\\"800\\\" class=\\\" lazyloaded\\\" data-srcset=\\\"https://img.vietcetera.com/uploads/images/13-jun-2021/kooples-hagiang18.jpg\\\" alt=\\\"\\\" title=\\\"Tình yêu không phải là yếu tố cốt lõi của một mối quan hệ lành mạnh\\\" src=\\\"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==\\\" srcset=\\\"https://img.vietcetera.com/uploads/images/13-jun-2021/kooples-hagiang18.jpg\\\">\\n            </picture>\\n<figcaption>Tình yêu không phải là yếu tố cốt lõi của một mối quan hệ lành mạnh.</figcaption>\\n</figure>\\n<p>Không phải là họ tự thuyết phục mình rằng đó là tình yêu, họ thực sự yêu đối phương. Bạn có thể yêu quý một người bạn hoặc họ hàng dẫu cho họ là kẻ nghiện rượu, thậm chí họ còn làm tổn thương bạn và những người xung quanh. Trẻ con có thể yêu bố mẹ dù cho họ <a href=\\\"https://vietcetera.com/vn/thieu-hut-cam-xuc-thoi-tho-au-nguyen-nhan-va-cach-de-chua-lanh\\\">bỏ bê</a> hoặc bạo hành chúng. Cùng cách đó, bạn có thể yêu một người hoàn toàn chẳng tốt cho bạn.</p>\\n<p>Tình yêu là không đủ để duy trì một mối quan hệ. Mặc dù, tình yêu vô điều kiện là một sản phẩm tuyệt vời được tạo ra bởi mối liên kết lành mạnh giữa hai người với nhau.</p>\\n</div><div><h2>Mất đi một khía cạnh sẽ xói mòn những yếu tố khác</h2>\\n<p>Vì vậy, với lời cảnh báo - <a href=\\\"https://vietcetera.com/vn/chi-yeu-thoi-thi-khong-du\\\" rel=\\\"noreferrer\\\">tình yêu là không đủ</a> để duy trì một mối quan hệ - hãy nói về cách mà một mối quan hệ lành mạnh có thể bắt đầu tan vỡ. Sau đó, chúng ta sẽ xem xét về việc khắc phục nó như thế nào.</p>\\n<p>Tôi gọi ba phẩm chất đã đề cập ở trên là yếu tố “cốt lõi” bởi vì chúng tạo nên một nền tảng vững chắc trong mối quan hệ. Và cũng giống như nền móng của một tòa nhà, chỉ cần một bộ phận lung lay, những bộ phận khác cũng sẽ lay chuyển.</p>\\n<p>Chẳng hạn, nếu đối phương bắt đầu mất đi <strong>sự thiện ý</strong>, nó sẽ dẫn đến <strong>lòng tin</strong> bị xói mòn. Bạn có thể thắc mắc tại sao mọi chuyện lại đột ngột thay đổi? Có phải họ đang để mắt hoặc gặp gỡ người khác? Có phải là họ để ý đến người khác nhiều hơn những gì họ nói với bạn? Có gì đó sai với bạn chăng?</p>\\n<p>Điều này có thể khiến một hoặc cả hai mất đi <strong>sự tôn trọng</strong> với nửa kia: đối phương trở nên không thoải mái với việc bạn cứ “đoán già đoán non” và bắt đầu nghi ngờ khả năng phán đoán của bạn (dù việc đó đúng hay không). Và thế là bạn càng lún sâu hơn vào trong nghi hoặc rằng liệu mình có chọn một người đủ tốt - bạn đánh mất lòng tin cho nửa kia.</p>\\n<figure class=\\\"full-width\\\" contenteditable=\\\"false\\\">\\n            <picture>\\n              <source media=\\\"(max-width: 568px)\\\" class=\\\" lazyloading\\\" data-srcset=\\\"https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang01-768x512.jpg 2x, https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang01-375x248.jpg 1x\\\" srcset=\\\"https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang01-768x512.jpg 2x, https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang01-375x248.jpg 1x\\\">\\n              <source media=\\\"(min-width: 569px)\\\" class=\\\" lazyloading\\\" data-srcset=\\\"https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang01.jpg 2x, https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang01-768x512.jpg 1x\\\" srcset=\\\"https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang01.jpg 2x, https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang01-768x512.jpg 1x\\\">\\n              <img width=\\\"1200\\\" height=\\\"800\\\" class=\\\" lazyloaded\\\" data-srcset=\\\"https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang01.jpg\\\" alt=\\\"Mối quan hệ lành mạnh\\\" title=\\\"Sự thiện ý lòng tin và tôn trọng chính là nền tảng vững chắc cho mối quan hệ\\\" src=\\\"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==\\\" srcset=\\\"https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang01.jpg\\\">\\n            </picture>\\n<figcaption>Sự thiện ý, lòng tin và tôn trọng chính là nền tảng vững chắc cho mối quan hệ.</figcaption>\\n</figure>\\n<p>Một ví dụ khác: đối phương vừa gia nhập một hệ thống mà theo bạn đó là đa cấp. Trước đó, bạn hoàn toàn tôn trọng trí tuệ và khả năng của họ. Nhưng giờ đây sự tôn trọng của bạn bị lung lay bởi bạn đang nghi ngờ đánh giá của chính mình về họ.</p>\\n<p>Điều này dẫn đến việc bạn thiếu niềm tin dành cho nửa kia khi đứng trước những quyết định tài chính (và có thể là những quyết định khác của họ nữa). Triển vọng của họ trong việc trở thành một đối tác lâu dài bị đặt nghi vấn: Nhỡ đâu họ đưa ra những quyết định tài chính ngu ngốc? Liệu tôi có bị cuốn vào những quyết định tồi tệ đó? Điều gì sẽ xảy ra nếu chúng tôi kết hôn và có con — liệu họ có thể đưa ra quyết định tốt cho gia đình?</p>\\n<p>Như bạn thấy, khi bạn đánh mất một yếu tố cốt lõi trong mối quan hệ lành mạnh, nó sẽ kéo theo sự sụp đổ của những yếu tố khác.</p>\\n<p>Tin tốt là bạn có thể ngăn cản điều này.</p>\\n</div><div><h2>Làm cách nào để khôi phục lại những yếu tố tạo nên mối quan hệ lành mạnh</h2>\\n<p>Những mối quan hệ lành mạnh, ở một thời điểm nhất định, sẽ buộc phải đối mặt với các vấn đề khiến cho một hoặc nhiều yếu tố bị lung lay. Điều này có thể bắt nguồn từ việc a) một trong hai người thay đổi hoặc b) ai đó gây ra sai lầm.</p>\\n<h3>Nếu một trong hai người thay đổi…</h3>\\n<p>Và ý tôi không phải là việc thay đổi kiểu tóc hoặc những gì hai bạn ăn vào buổi sáng mà là những thay đổi về bản chất.</p>\\n<p>Có thể nửa kia tìm thấy một niềm tin mới và quyết định dành nhiều thời gian cho nó. Nếu bạn không có cùng niềm tin, điều này dĩ nhiên sẽ dẫn đến căng thẳng giữa hai người.</p>\\n<p>Hoặc cũng có thể bạn nghĩ rằng thế giới đang đi đến tận thế và bạn sẽ dành tất cả thời gian để xây một buồng an toàn ở sân sau cũng như dự trữ súng đạn lẫn thức ăn. Nếu đối phương không thích lối sống này, cũng dễ hiểu khi họ bắt đầu nghi ngờ việc ở bên bạn.</p>\\n<p>Những thay đổi ở mức độ bản chất thường khiến mọi người đánh mất niềm tin dành cho nhau. Sự ngưỡng mộ mà bạn dành cho họ sẽ tan biến hoặc không còn quan trọng với họ nữa, hay bị thay thế bởi thứ mà bạn không coi trọng nhiều như họ. Điều này tạo ra một khoảng trống về sự tôn trọng trong mối quan hệ.</p>\\n<figure class=\\\"full-width\\\" contenteditable=\\\"false\\\">\\n            <picture>\\n              <source media=\\\"(max-width: 568px)\\\" class=\\\" lazyloading\\\" data-srcset=\\\"https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang26-1623406562633-768x512.jpg 2x, https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang26-1623406562633-375x248.jpg 1x\\\" srcset=\\\"https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang26-1623406562633-768x512.jpg 2x, https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang26-1623406562633-375x248.jpg 1x\\\">\\n              <source media=\\\"(min-width: 569px)\\\" class=\\\" lazyloading\\\" data-srcset=\\\"https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang26-1623406562633.jpg 2x, https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang26-1623406562633-768x512.jpg 1x\\\" srcset=\\\"https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang26-1623406562633.jpg 2x, https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang26-1623406562633-768x512.jpg 1x\\\">\\n              <img width=\\\"1200\\\" height=\\\"800\\\" class=\\\" lazyloaded\\\" data-srcset=\\\"https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang26-1623406562633.jpg\\\" alt=\\\"mối quan hệ lành mạnh\\\" title=\\\"Ở những thời điểm nhất định mối quan hệ lành mạnh cũng phải đối mặt với thử thách khiến một trong ba yếu tố cốt lõi bị lung lay&nbsp;\\\" src=\\\"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==\\\" srcset=\\\"https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang26-1623406562633.jpg\\\">\\n            </picture>\\n<figcaption>Ở những thời điểm nhất định, mối quan hệ lành mạnh cũng phải đối mặt với thử thách khiến một trong ba yếu tố cốt lõi bị lung lay.&nbsp;</figcaption>\\n</figure>\\n<p>Thẳng thắn mà nói, đây là vấn đề rất khó vượt qua. Nhưng nếu bạn sẵn lòng chấp nhận họ cũng như bản chất mới này, bạn sẽ tìm lại được sự tôn trọng.</p>\\n<p>Chẳng hạn, nếu họ có một niềm tin mới và bạn từng rất ngưỡng mộ thế giới quan nhân văn, thế tục của họ, bạn có thể tìm ra cách để tôn trọng lòng trắc ẩn của họ đối với người khác.</p>\\n<p>Nếu họ quyết định trở thành <a href=\\\"https://vietcetera.com/vn/4-ung-dung-cho-nguoi-an-thuan-chay\\\" rel=\\\"noreferrer\\\">một người ăn thuần chay</a>, yêu thực vật và bạn thì chỉ thích ăn thịt. Có lẽ bạn có thể tôn trọng lối sống xanh của họ?</p>\\n<p>Cái chính là sự tôn trọng bị mất đi khi người kia thay đổi phải được bù đắp bằng cách này hay cách khác.</p>\\n<h3>Nếu một trong hai người phạm sai lầm…</h3>\\n<p>Chẳng ai là hoàn hảo. Tôi biết điều đó là hiển nhiên, nhưng nó vẫn lặp lại vì đôi khi tiêu chuẩn của chúng ta đối với người khác không hợp lý.</p>\\n<p>Nhưng ở bất kỳ mức độ nào, khi một trong hai người phạm lỗi lầm, niềm tin trong mối quan hệ bị xâm phạm.</p>\\n<p>Dù lỗi lầm đó là gì, có những yếu tố cần thiết để mối quan hệ được khôi phục:</p>\\n<ul>\\n<li><strong>Hãy cho nó thêm thời gian:</strong> sự nhức nhối mà lỗi lầm để lại sẽ dần phai nhạt theo thời gian. Nếu bạn làm gì sai, hãy cho đối phương không gian để xử lý tình hình. Nếu người sai là họ, hãy bảo họ bạn cần thời gian để nghĩ về nó.</li>\\n<li><strong>Đảm bảo rằng điều đó chỉ diễn ra một lần: </strong>nhận ra lỗi lầm là một chuyện, nhưng có trách nhiệm trong việc không tái diễn nó thể hiện rằng bạn nghiêm túc. Hãy tránh việc tái phạm bằng mọi giá khi biết rằng điều đó thực sự đe dọa mối quan hệ.</li>\\n<li><strong>Người còn lại phải mở lòng để tha thứ:</strong> Dù thời gian đã qua đi và người mắc sai lầm đã cố gắng không tái phạm, <a href=\\\"https://vietcetera.com/vn/lam-sao-de-tha-thu-nhung-khong-quen-lang\\\" rel=\\\"noreferrer\\\">điều này cũng không đồng nghĩa với việc “nạn nhân” sẵn lòng bỏ qua cho họ</a>.</li>\\n</ul>\\n<p>Lỗi lầm có sự đa dạng về mức độ và độ nghiêm trọng, vì thế cũng khác nhau ở mức độ dễ dàng để vượt qua chúng.</p>\\n<figure class=\\\"full-width\\\" contenteditable=\\\"false\\\">\\n            <picture>\\n              <source media=\\\"(max-width: 568px)\\\" class=\\\" lazyloading\\\" data-srcset=\\\"https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang30-768x512.jpg 2x, https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang30-375x248.jpg 1x\\\" srcset=\\\"https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang30-768x512.jpg 2x, https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang30-375x248.jpg 1x\\\">\\n              <source media=\\\"(min-width: 569px)\\\" class=\\\" lazyloading\\\" data-srcset=\\\"https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang30.jpg 2x, https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang30-768x512.jpg 1x\\\" srcset=\\\"https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang30.jpg 2x, https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang30-768x512.jpg 1x\\\">\\n              <img width=\\\"1200\\\" height=\\\"800\\\" class=\\\" lazyloaded\\\" data-srcset=\\\"https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang30.jpg\\\" alt=\\\"mối quan hệ lành mạnh\\\" title=\\\"Khi một trong hai phạm lỗi hãy cho mối quan hệ thêm thời gian&nbsp;\\\" src=\\\"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==\\\" srcset=\\\"https://img.vietcetera.com/uploads/images/11-jun-2021/kooples-hagiang30.jpg\\\">\\n            </picture>\\n<figcaption>Khi một trong hai phạm lỗi, hãy cho mối quan hệ thêm thời gian.&nbsp;</figcaption>\\n</figure>\\n<p>Những lỗi lầm nhỏ như một lời nhận xét ác ý ở sai thời điểm hoặc quên béng việc đối phương đã nhờ vả, thường tốn ít thời gian để vượt qua, chúng thường dễ tránh và dễ được tha thứ.</p>\\n<p>Những sai lầm lớn hơn sẽ khiến cả hai phải nỗ lực hơn rất nhiều. Bạn cần phải tự hỏi bản thân rằng liệu điều đó có xứng đáng hay không (và phải trung thực trong câu trả lời).</p>\\n</div><div><h2>Liệu có thể cứu vãn một mối quan hệ độc hại?</h2>\\n<p>Đây là dạng câu hỏi mà tôi đã nhận được rất nhiều. Dù câu chuyện đằng sau của mỗi người có thể khác nhau nhưng tựu trung đó chính là: Làm cách nào để biến mối quan hệ độc hại trở nên lành mạnh?<br><br>Nếu bạn không chắc lắm về việc mối quan hệ của mình có độc hại hay không và làm cách nào để sửa chữa điều đó, hay đọc qua bài viết của tôi:</p>\\n<p><a href=\\\"https://vietcetera.com/vn/6-dieu-doc-hai-trong-moi-quan-he-ma-ban-coi-la-binh-thuong\\\">6 Điều độc hại trong mối quan hệ mà bạn coi là bình thường</a></p>\\n<p><a href=\\\"https://vietcetera.com/vn/thay-doi-moi-quan-he-doc-hai-dau-la-dieu-nen-lam\\\">Thay đổi mối quan hệ độc hại: Đâu là điều nên làm?</a></p>\\n<hr>\\n<p><strong>Photographer:</strong>&nbsp;Maika Elan</p>\\n<p><strong>Art Director:</strong>&nbsp;Thành Đào</p>\\n<p><strong>Stylist:</strong>&nbsp;Chi Lemon</p>\\n<p><strong>Trang phục:</strong>&nbsp;<a href=\\\"https://www.maisononline.vn/collections/the-kooples\\\" target=\\\"_blank\\\" rel=\\\"noopener\\\">THE KOOPLES</a></p>\\n<p><strong>Designer:</strong>&nbsp;Alex Nguyễn</p></div></div>\"", "excerpt": "<p>Theo Mark Manson nếu một trong ba yếu tố của mối quan hệ lành mạnh mất đi, những yếu tố khác cũng sẽ bị lung lay.</p>", "tags": "Tình yêu,Mối quan hệ", "categoryId": "", "metaTitle": "3 Yếu tố không thể thiếu của mối quan hệ lành mạnh", "metaDescription": "" }
 *          schema:
 *            properties:
 *              title:
 *                type: string
 *              slug:
 *                type: string
 *              featuredImage:
 *                type: string
 *              oldSlug:
 *                type: string
 *              publish:
 *                type: boolean
 *              author:
 *                type: string
 *              content:
 *                type: string
 *              excerpt:
 *                type: string
 *              tags:
 *                type: string
 *              categoryId:
 *                type: string
 *              metaTitle:
 *                type: string
 *              metaDescription:
 *                type: string
 *            required:
 *                - title
 *                - slug
 *                - oldSlug
 *                - publish
 *                - author
 *                - categoryId
 *    description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 * /api/post/{slug}:
 *  get:
 *    tags: [Post]
 *    security:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    parameters:
 *      - in: path
 *        name: slug
 *        required: true
 *    responses:
 *      200:
 *        description: OK
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server Error
 *    description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */

post.get('/', getPost).post('/', createPost);

post
  .get('/:slug', getPostBySlug)
  .put('/:slug', editPost)
  .delete('/:slug', deletePost);

export default post;
