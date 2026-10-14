# HV-K01C-Lite — Minimal Source Registry contract

Ngày 14/10/2026. Trạng thái: **SOURCE REGISTRY BASELINE — REVIEW REQUIRED**.

## Phạm vi và quan hệ với registry cũ

`knowledge-source-registry.schema.json` là contract nghiên cứu tối thiểu cho K01.
Nó không thay thế `source-registry.json`, không thay admission runtime, không mở rule
hoặc expected field mới. Registry ban đầu nhập ba tài nguyên thực đang tồn tại:

1. Wikisource `卷二`, revision `1963110`;
2. Wikisource `卷一`, revision `7913704`;
3. một Archive facsimile item chứa các leaf đã đối chiếu.

Hai leaf n72/n74 thuộc cùng Archive item nên chỉ là một source record. Các volume và
facsimile cùng được đặt trong textual lineage chưa xác định; không được tính thành
hai family độc lập cho KPI calculation.

## Contract decisions

- Source, Passage và ReviewEvent có ID/version riêng; unknown field bị cấm ở schema.
- Mỗi source bắt buộc có scope, school claim state, access, rights, provenance,
  family/independence, lifecycle status và limitations.
- School label là claim có evidence state, không phải chuỗi nhãn đủ để chứng nhận.
- `source-backed` chỉ xác nhận locator/passage đã được review trong phạm vi ghi rõ.
- `approved-for-implementation` cần review event riêng; K01C-Lite không tạo trạng thái đó.
- Paid source luôn cần PO approval; rights unknown/restricted không cho sao chép nội dung.
- `sourceFamilyId` và `implementationFamilyId` ngăn đếm fork/scan/transcription liên
  quan như các kiểm chứng độc lập.
- Passage lưu locator, text policy, support scope và profile scope. Quote chỉ được
  lưu ở mức tối thiểu hợp pháp và đã review.

## Access verification actually performed

Ngày 14/10/2026, ba request thủ công giới hạn trả HTTP 200: Wikisource revision
1963110, Wikisource revision 7913704 và Archive leaf n72. Đây chỉ là kiểm tra khả
năng truy cập, không xác thực nội dung, bản quyền, ấn bản hoặc độc lập nguồn.

## Initial registry limitations

- Mới nhập 3/4 legacy entries vì hai leaf Archive được chuẩn hóa thành một source.
- Chỉ nhập ba passage đại diện; legacy registry vẫn là authority cho sáu passage
  hiện dùng. Không passage nào mới được admit.
- Tác giả, ấn bản, NXB/năm của underlying classical work chưa xác minh.
- Chưa có source/implementation family độc lập thứ hai cho calculation trọng yếu.
- Không có complete golden chart, không có rule production mới và không có xác nhận
  độc lập rằng profile hiện tại là Nam Phái.

## Transition after K01A/K01B

K01A bổ sung source/book candidates vào artifact riêng, không sửa schema. K01B bổ
sung software/site candidates vào artifact riêng. PM chỉ merge candidates vào
registry sau review identity, rights, family và profile. K01C contract chỉ được đổi
khi cả hai task nêu một field blocker có bằng chứng.
