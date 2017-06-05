package com.gitbookreader;

import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.folioreader.activity.FolioActivity;

public class Jumper extends ReactContextBaseJavaModule {
    private Context mContext;

    public Jumper(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @Override
    public String getName() {
        return "Jumper";
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
}
