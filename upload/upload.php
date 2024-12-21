<?php
// 指定上传文件的存储目录
$uploadDir = 'uploads/';
// 确保上传目录存在并且可写
if (!is_dir($uploadDir) || !is_writable($uploadDir)) {
    die("上传目录不存在或不可写，请检查后重试。");
}

// 检查是否有文件被上传
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $file =$_FILES['file'];

    // 检查上传过程中是否有错误发生
    if ($file['error'] === UPLOAD_ERR_OK) {
        // 获取文件的临时路径
        $tmpName =$file['tmp_name'];
        // 获取文件的原始名称
        $name = basename($file['name']);
        // 设置文件的目标路径
        $targetPath =$uploadDir . $name;

        // 尝试移动上传的文件到目标目录
        if (move_uploaded_file($tmpName,$targetPath)) {
            echo "文件上传成功。";
        } else {
            echo "文件上传失败。";
        }
    } else {
        // 错误处理
        switch ($file['error']) {
            case UPLOAD_ERR_INI_SIZE:
                echo "文件大小超过了PHP配置中的upload_max_filesize值。";
                break;
            case UPLOAD_ERR_FORM_SIZE:
                echo "文件大小超过了HTML表单中MAX_FILE_SIZE指定的值。";
                break;
            case UPLOAD_ERR_PARTIAL:
                echo "文件只有部分被上传。";
                break;
            case UPLOAD_ERR_NO_FILE:
                echo "没有文件被上传。";
                break;
            case UPLOAD_ERR_NO_TMP_DIR:
                echo "找不到临时文件夹。";
                break;
            case UPLOAD_ERR_CANT_WRITE:
                echo "文件写入失败。";
                break;
            case UPLOAD_ERR_EXTENSION:
                echo "文件上传被PHP扩展阻止。";
                break;
            default:
                echo "未知错误。";
                break;
        }
    }
} else {
    echo "无效的请求。";
}
?>
