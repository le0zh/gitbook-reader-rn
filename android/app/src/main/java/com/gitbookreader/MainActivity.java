package com.gitbookreader;

import android.graphics.Color;
import android.util.TypedValue;
import android.view.Gravity;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {
    @Override
    public LinearLayout createSplashLayout() {
        LinearLayout view = new LinearLayout(this);
        ImageView imageView = new ImageView(this);

        view.setBackgroundColor(Color.parseColor("#ffffff"));
        view.setGravity(Gravity.CENTER);

        imageView.setBackgroundResource(R.drawable.ic_logo);

        view.addView(imageView);
        return view;
    }
}
