# backend/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('limitless_events.urls')),  # 👈 Add this line
]
