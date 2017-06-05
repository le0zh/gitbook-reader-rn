package com.gitbookreader;

import com.facebook.react.ReactPackage;
import com.reactnativenavigation.NavigationApplication;
import com.rnfs.RNFSPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new MyPackage(),
                new RNFSPackage()
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }
}
