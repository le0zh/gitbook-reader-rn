package com.gitbookreader;

import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.folioreader.activity.FolioActivity;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class MyNativeModule extends ReactContextBaseJavaModule {
    private Context mContext;

    public MyNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @Override
    public String getName() {
        return "MyNativeModule";
    }

    @ReactMethod
    public void startFolioReader(String path, Promise promise) {
        Log.d("le0zh", "start read " + path);
        Intent intent = new Intent(mContext, FolioActivity.class);
        intent.putExtra(FolioActivity.INTENT_EPUB_SOURCE_TYPE, FolioActivity.EpubSourceType.SD_CARD);
        intent.putExtra(FolioActivity.INTENT_EPUB_SOURCE_PATH, path);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        mContext.startActivity(intent);
    }

    @ReactMethod
    public void unZipFile(String zipFileString, String outPathString, Promise promise){
        try{
            unzip(zipFileString, outPathString);
            promise.resolve(true);
        }catch (Exception e){
            promise.reject(e.getMessage());
        }
    }

    /**
     * unzip to dir
     */
    private void unzip(String zipFileString, String outPathString) throws IOException {
        ZipInputStream inZip = null;
        try {
            inZip = new ZipInputStream(new FileInputStream(zipFileString));
            ZipEntry zipEntry;
            String szName;
            while ((zipEntry = inZip.getNextEntry()) != null) {
                szName = zipEntry.getName().replaceAll(" ", "");
                // MyLogger.d(TAG, "---szName>>" + szName);
                if (zipEntry.isDirectory()) {
                    // MyLogger.d(TAG, " ---zipEntry.isDirectory()---");
                    szName = szName.substring(0, szName.length() - 1);
                    File folder = new File(outPathString + File.separator + szName);
                    boolean mkb = folder.mkdirs();
                } else {
                    String[] tmpNames = null;
                    if (szName.lastIndexOf("/") > 0) {
                        tmpNames = szName.split("/");
                    }
                    if (tmpNames != null) {
                        String tmpFolder = tmpNames[0];
                        File folder = new java.io.File(outPathString + File.separator + tmpFolder);
                        if (!folder.exists()) {
                            folder.mkdirs();
                        }
                    }

                    File file = new File(outPathString + File.separator + szName);

                    boolean cf = file.createNewFile();
                    FileOutputStream out = null;
                    try {
                        out = new FileOutputStream(file);
                        int len;
                        byte[] buffer = new byte[1024];
                        while ((len = inZip.read(buffer)) != -1) {
                            out.write(buffer, 0, len);
                            out.flush();
                        }
                    } catch (Exception e) {
                        // MyLogger.e(TAG, e.getMessage());
                    } finally {
                        if (out != null) {
                            out.close();
                        }
                    }
                }
            }
        } catch (Exception e) {
            // MyLogger.e(TAG, e.getMessage());
        } finally {
            if (inZip != null) {
                inZip.close();
            }
        }
    }
}
